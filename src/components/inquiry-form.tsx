"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { services, contact } from "@/data/business";
import { Photograph } from "@/components/photograph";
import { heroMedia } from "@/content/photography";
import {
  inquirySchema,
  inquiryVehicleTypes,
  prepareSimpleInquiryEmail,
  type InquiryDetails,
} from "@/lib/simple-inquiry";

type InquiryDraft = Omit<InquiryDetails, "vehicleType"> & {
  vehicleType: InquiryDetails["vehicleType"] | "";
};

export function InquiryForm({ initialService }: { initialService?: string }) {
  const [draft, setDraft] = useState<InquiryDraft>(() => {
    const service = services.find((item) => item.id === initialService);
    return {
      name: "",
      phone: "",
      email: "",
      vehicleType: "",
      notes: service ? `I'm interested in ${service.name}.` : "",
    };
  });
  const [prepared, setPrepared] = useState<InquiryDetails | null>(null);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (prepared) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [prepared]);

  function change<K extends keyof InquiryDraft>(
    key: K,
    value: InquiryDraft[K],
  ) {
    setDraft((previous) => ({ ...previous, [key]: value }));
    setError("");
  }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checked = inquirySchema.safeParse(draft);
    if (!checked.success) {
      setError(checked.error.issues[0].message);
      return;
    }
    setDraft(checked.data);
    setPrepared(checked.data);
    setError("");
    setCopyStatus("");
  }
  const inquiry = prepared
    ? prepareSimpleInquiryEmail(prepared, contact.email!)
    : null;
  async function copyInquiry() {
    if (!inquiry) return;
    try {
      await navigator.clipboard.writeText(inquiry.copyText);
      setCopyStatus(
        "Details copied. Paste them into your email and press Send.",
      );
    } catch {
      setCopyStatus(
        "Select the message below and copy it into your email. Then press Send.",
      );
    }
  }

  if (inquiry)
    return (
      <section className="section booking-success request-success">
        <h1 ref={heading} tabIndex={-1}>
          Your inquiry is ready.
        </h1>
        <p className="body-copy">
          Your details have not been sent. Open your email app, review the
          message, and press Send. No appointment has been reserved.
        </p>
        <a href={inquiry.href} className="button">
          Open email to send
        </a>
        <p className="form-copy">
          Send to <a href={`mailto:${contact.email}`}>{contact.email}</a>. Keep
          this page open to retain your details. If your email app does not
          open, copy the message below and send it yourself.
        </p>
        <button type="button" className="button" onClick={copyInquiry}>
          Copy inquiry details
        </button>
        <p className="form-copy" role="status">
          {copyStatus}
        </p>
        <label className="field" htmlFor="inquiry-message">
          Message to copy
          <textarea
            id="inquiry-message"
            className="inquiry-copy"
            readOnly
            rows={12}
            value={inquiry.copyText}
            onFocus={(event) => event.currentTarget.select()}
          />
        </label>
        <button
          type="button"
          className="button"
          onClick={() => {
            setPrepared(null);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        >
          Edit details
        </button>
        <Link href="/" className="button">
          Back to Landry’s
        </Link>
      </section>
    );

  return (
    <section className="section request-flow simple-inquiry">
      <div className="request-introduction">
        <h1>Request your detail.</h1>
        <p className="body-copy">
          Tell us how to reach you and what your vehicle needs. Pricing is
          available by inquiry, with the work and quote agreed before
          scheduling.
        </p>
      </div>
      <div className="request-layout">
        <aside className="request-visual">
          <Photograph
            image={heroMedia}
            className="request-photograph"
            sizes="(max-width:800px) 100vw, 40vw"
            eager
          />
          <div>
            <h2>
              At your home
              <br />
              or workplace.
            </h2>
            <p>
              Northwest Arkansas &amp;
              <br />
              the Arkansas River Valley.
            </p>
            <a href={`mailto:${contact.email}`}>
              Inquire about pricing <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
        <div className="request-panel">
          <form
            onSubmit={submit}
            aria-describedby={error ? "request-error" : "inquiry-help"}
          >
            <h2>Your details.</h2>
            <label className="field" htmlFor="inquiry-name">
              Name
              <input
                id="inquiry-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                value={draft.name}
                onChange={(event) => change("name", event.target.value)}
              />
            </label>
            <label className="field" htmlFor="inquiry-phone">
              Phone
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                maxLength={25}
                value={draft.phone}
                onChange={(event) => change("phone", event.target.value)}
              />
            </label>
            <label className="field" htmlFor="inquiry-email">
              Email
              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                value={draft.email}
                onChange={(event) => change("email", event.target.value)}
              />
            </label>
            <fieldset className="inquiry-vehicle">
              <legend>Vehicle type</legend>
              <div className="inquiry-vehicle-choices">
                {inquiryVehicleTypes.map((type) => (
                  <label
                    key={type}
                    className={
                      draft.vehicleType === type ? "choice selected" : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="vehicleType"
                      value={type}
                      required
                      checked={draft.vehicleType === type}
                      onChange={() => change("vehicleType", type)}
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="field" htmlFor="inquiry-notes">
              Notes/Details
              <textarea
                id="inquiry-notes"
                name="notes"
                rows={5}
                maxLength={1200}
                value={draft.notes}
                onChange={(event) => change("notes", event.target.value)}
                placeholder="Tell us about your vehicle and the work you have in mind."
              />
            </label>
            <p id="inquiry-help" className="form-copy">
              This prepares an email to {contact.email}. You’ll review it and
              press Send in your email app.{" "}
              <Link href="/privacy">Privacy notice</Link>
              {" · "}
              <Link href="/terms">Request terms</Link>
            </p>
            {error && (
              <p id="request-error" className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="form-actions">
              <button type="submit" className="button">
                Prepare email inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
