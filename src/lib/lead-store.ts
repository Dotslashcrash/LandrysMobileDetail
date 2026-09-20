import { DatabaseSync } from "node:sqlite";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import type { LeadRequest } from "./booking-schema";
export type StoredRecord = {
  request: LeadRequest;
  receivedAt: string;
  delivery: "local" | "pending" | "fallback" | "urable";
  externalId?: string;
};
function storage() {
  // Runtime data must not be bundled into deployment artifacts.
  const dir = path.resolve(
    /* turbopackIgnore: true */ process.env.LEAD_STORAGE_DIR ||
      "./private-data",
  );
  const publicDir = path.resolve("./public");
  if (dir === publicDir || dir.startsWith(publicDir + path.sep))
    throw new Error("UNSAFE_STORAGE_PATH");
  mkdirSync(dir, { recursive: true, mode: 0o700 });
  let key: Buffer;
  if (process.env.LEAD_ENCRYPTION_KEY)
    key = Buffer.from(process.env.LEAD_ENCRYPTION_KEY, "base64");
  else {
    const keyPath = path.join(dir, ".encryption-key");
    try {
      writeFileSync(keyPath, randomBytes(32), { flag: "wx", mode: 0o600 });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    }
    key = readFileSync(keyPath);
  }
  if (key.length !== 32) throw new Error("INVALID_ENCRYPTION_KEY");
  const db = new DatabaseSync(path.join(dir, "leads.sqlite"));
  db.exec(
    "PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, payload TEXT NOT NULL)",
  );
  return { db, key };
}
function encrypt(record: StoredRecord, key: Buffer) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const data = Buffer.concat([
    cipher.update(JSON.stringify(record), "utf8"),
    cipher.final(),
  ]);
  return JSON.stringify({
    v: 1,
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: data.toString("base64"),
  });
}
function decrypt(payload: string, key: Buffer): StoredRecord {
  const p = JSON.parse(payload);
  const decipher = createDecipheriv(
    "aes-256-gcm",
    key,
    Buffer.from(p.iv, "base64"),
  );
  decipher.setAuthTag(Buffer.from(p.tag, "base64"));
  return JSON.parse(
    Buffer.concat([
      decipher.update(Buffer.from(p.data, "base64")),
      decipher.final(),
    ]).toString("utf8"),
  );
}
export function saveLead(
  request: LeadRequest,
  delivery: StoredRecord["delivery"],
): { record: StoredRecord; created: boolean } {
  const { db, key } = storage();
  try {
    const record: StoredRecord = {
      request,
      receivedAt: new Date().toISOString(),
      delivery,
    };
    const result = db
      .prepare("INSERT OR IGNORE INTO leads (id, payload) VALUES (?, ?)")
      .run(request.requestId, encrypt(record, key));
    if (result.changes) return { record, created: true };
    const existing = db
      .prepare("SELECT payload FROM leads WHERE id = ?")
      .get(request.requestId) as { payload: string };
    const stored = decrypt(existing.payload, key);
    if (JSON.stringify(stored.request) !== JSON.stringify(request))
      throw new Error("IDEMPOTENCY_CONFLICT");
    return { record: stored, created: false };
  } finally {
    db.close();
  }
}
export function updateLead(record: StoredRecord) {
  const { db, key } = storage();
  try {
    db.prepare("UPDATE leads SET payload = ? WHERE id = ?").run(
      encrypt(record, key),
      record.request.requestId,
    );
  } finally {
    db.close();
  }
}
// Local operator access only. Never expose this through an unauthenticated route.
export function listLeads(): StoredRecord[] {
  const { db, key } = storage();
  try {
    return (
      db.prepare("SELECT payload FROM leads").all() as { payload: string }[]
    ).map((row) => decrypt(row.payload, key));
  } finally {
    db.close();
  }
}
