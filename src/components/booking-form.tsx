"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { services, serviceAreas } from "@/data/business";
import {
  arkansasDate,
  conditionOptions,
  vehicleTypes,
  timeWindows,
  vehicleSchema,
  serviceSchema,
  locationSchema,
  preferenceSchema,
  customerSchema,
  leadSchema,
  type LeadRequest,
} from "@/lib/booking-schema";
import { track, readAttribution } from "@/lib/analytics";
import type { SubmissionResult } from "@/integrations/urable/types";
const steps = [
  "Your vehicle",
  "The service",
  "Condition",
  "Your location",
  "Preferred time",
  "About you",
  "Review",
];
type Draft = Omit<LeadRequest, "consent"> & { consent: boolean };
export function BookingForm({
  initialService,
  initialMarket,
}: {
  initialService?: string;
  initialMarket?: string;
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>({
    requestId: "",
    vehicle: { year: "", make: "", model: "", type: "Car", trim: "" },
    serviceId: services.some((s) => s.id === initialService)
      ? initialService!
      : "",
    conditions: [],
    notes: "",
    location: {
      address: "",
      city: "",
      zip: "",
      market:
        initialMarket === "river-valley"
          ? "river-valley"
          : "northwest-arkansas",
    },
    preference: { date: "", window: "Flexible" },
    customer: { firstName: "", lastName: "", phone: "", email: "" },
    consent: false,
    website: "",
    attribution: {},
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const id = useRef("");
  useEffect(() => {
    track("booking_started");
  }, []);
  const change = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setError("");
  };
  const go = (next: number) => {
    setStep(next);
    setError("");
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ behavior: "auto", block: "center" });
    });
  };
  function validate() {
    const result =
      step === 0
        ? vehicleSchema.safeParse(draft.vehicle)
        : step === 1
          ? serviceSchema.safeParse(draft.serviceId)
          : step === 3
            ? locationSchema.safeParse(draft.location)
            : step === 4
              ? preferenceSchema.safeParse(draft.preference)
              : step === 5
                ? customerSchema.safeParse(draft.customer)
                : null;
    if (result && !result.success) {
      setError(result.error.issues[0].message);
      return false;
    }
    if (step === 2 && !draft.conditions.length) {
      setError("Choose at least one condition.");
      return false;
    }
    return true;
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (step < 6) {
      if (!validate()) return;
      if (step === 0) track("vehicle_entered");
      if (step === 1) track("service_selected");
      if (step === 3) track("service_area_selected");
      go(step + 1);
      return;
    }
    if (!id.current) id.current = crypto.randomUUID();
    const payload = {
      ...draft,
      requestId: id.current,
      attribution: readAttribution(),
    };
    const checked = leadSchema.safeParse(payload);
    if (!checked.success) {
      setError(checked.error.issues[0].message);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.data),
        signal: AbortSignal.timeout(20000),
      });
      const body = await response.json();
      if (!response.ok)
        throw new Error(
          body.error || "We couldn’t save your request. Please try again.",
        );
      if (
        body.status !== "received" &&
        !(
          body.status === "confirmed" &&
          body.confirmationId &&
          body.confirmedAt
        )
      )
        throw new Error(
          "We couldn’t verify the response. Please retry your request.",
        );
      setResult(body);
      track("appointment_requested");
      if (body.status === "confirmed") track("booking_completed");
      window.scrollTo({ top: 0 });
    } catch (failure) {
      setError(
        failure instanceof Error &&
          failure.name !== "TimeoutError" &&
          failure.name !== "TypeError"
          ? failure.message
          : "We couldn’t reach the server. Your details are still here. Please try again.",
      );
    } finally {
      setBusy(false);
    }
  }
  const service = services.find((s) => s.id === draft.serviceId);
  const summary = (
    <dl className="request-summary">
      <div>
        <dt>Vehicle</dt>
        <dd>
          {draft.vehicle.year} {draft.vehicle.make} {draft.vehicle.model}
          {draft.vehicle.trim && ` · ${draft.vehicle.trim}`}
        </dd>
      </div>
      <div>
        <dt>Service interest</dt>
        <dd>{service?.name}</dd>
      </div>
      <div>
        <dt>Condition</dt>
        <dd>
          {draft.conditions.join(", ")}
          {draft.notes && <p>{draft.notes}</p>}
        </dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>
          {draft.location.address}
          <br />
          {draft.location.city}, AR {draft.location.zip}
          <br />
          {serviceAreas.find((a) => a.id === draft.location.market)?.name}
        </dd>
      </div>
      <div>
        <dt>Requested time</dt>
        <dd>
          {draft.preference.date} · {draft.preference.window}
          <br />
          <span>Arkansas time · subject to confirmation</span>
        </dd>
      </div>
      <div>
        <dt>Contact</dt>
        <dd>
          {draft.customer.firstName} {draft.customer.lastName}
          <br />
          {draft.customer.phone}
          <br />
          {draft.customer.email}
        </dd>
      </div>
    </dl>
  );
  if (result)
    return (
      <section className="section booking-success">
        <CheckCircle2 size={44} />
        <p className="eyebrow">REQUEST RECEIVED</p>
        <h1>
          YOUR DETAIL
          <br />
          <em>STARTS HERE.</em>
        </h1>
        <p className="large-copy">
          Thanks, {draft.customer.firstName}. We have your request.
        </p>
        <p className="body-copy">
          {result.status === "confirmed"
            ? `Confirmation ${result.confirmationId}. Your confirmed appointment: ${result.confirmedAt}.`
            : "Your preferred time is not yet booked. Landry’s will review your vehicle and location, then contact you to discuss the work and confirm scheduling."}
        </p>
        <div className="success-details">{summary}</div>
        <p className="fineprint">Request reference: {result.reference}</p>
        <Link href="/" className="button">
          Back to Landry’s <ArrowRight size={18} />
        </Link>
      </section>
    );
  return (
    <section className="section booking-layout">
      <aside className="booking-aside">
        <p className="eyebrow">LET’S GET YOU STARTED</p>
        <h1>
          YOUR RIDE.
          <br />
          <em>YOUR RESET.</em>
        </h1>
        <p className="body-copy">
          A few details. A better plan.
          <br />
          Tell us what your vehicle needs.
        </p>
        <ol className="step-list" aria-label="Request progress">
          {steps.map((label, index) => (
            <li
              key={label}
              className={
                index === step ? "active" : index < step ? "complete" : ""
              }
              aria-current={index === step ? "step" : undefined}
            >
              <span>
                {index < step ? (
                  <Check size={13} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              {index < step ? (
                <button type="button" onClick={() => go(index)}>
                  {label}
                </button>
              ) : (
                label
              )}
            </li>
          ))}
        </ol>
        <p className="booking-note">
          This is an appointment request.
          <br />
          We’ll confirm availability and pricing with you.
        </p>
      </aside>
      <div className="booking-panel">
        <div className="booking-progress">
          <span>STEP {String(step + 1).padStart(2, "0")} / 07</span>
          <span>{Math.round(((step + 1) / 7) * 100)}%</span>
        </div>
        <div className="progress-track">
          <div style={{ width: `${((step + 1) / 7) * 100}%` }} />
        </div>
        <form onSubmit={submit}>
          <h2 tabIndex={-1} ref={heading}>
            {
              [
                "WHAT DO YOU DRIVE?",
                "WHAT DOES IT NEED?",
                "TELL US A LITTLE MORE.",
                "WHERE SHOULD WE GO?",
                "WHAT WORKS FOR YOU?",
                "HOW CAN WE REACH YOU?",
                "LOOKING GOOD?",
              ][step]
            }
          </h2>
          {step === 0 && (
            <>
              <p className="form-copy">
                Start with the vehicle you’d like detailed.
              </p>
              <div className="field-grid">
                <Field
                  label="Year"
                  name="vehicle-year"
                  value={draft.vehicle.year}
                  onChange={(v) =>
                    change("vehicle", { ...draft.vehicle, year: v })
                  }
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="2022"
                />
                <Field
                  label="Make"
                  name="vehicle-make"
                  value={draft.vehicle.make}
                  onChange={(v) =>
                    change("vehicle", { ...draft.vehicle, make: v })
                  }
                  maxLength={60}
                  placeholder="Toyota"
                />
                <Field
                  label="Model"
                  name="vehicle-model"
                  value={draft.vehicle.model}
                  onChange={(v) =>
                    change("vehicle", { ...draft.vehicle, model: v })
                  }
                  maxLength={80}
                  placeholder="4Runner"
                />
                <label className="field">
                  Vehicle type
                  <select
                    value={draft.vehicle.type}
                    onChange={(e) =>
                      change("vehicle", {
                        ...draft.vehicle,
                        type: e.target.value as Draft["vehicle"]["type"],
                      })
                    }
                  >
                    {vehicleTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <Field
                  label="Trim (optional)"
                  name="vehicle-trim"
                  value={draft.vehicle.trim}
                  onChange={(v) =>
                    change("vehicle", { ...draft.vehicle, trim: v })
                  }
                  maxLength={80}
                  required={false}
                  placeholder="TRD Off-Road"
                />
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <p className="form-copy">
                Choose your main interest. We’ll confirm what’s right for your
                vehicle.
              </p>
              <fieldset className="service-choices">
                <legend className="sr-only">Service interest</legend>
                {services.map((s) => (
                  <label
                    key={s.id}
                    className={
                      draft.serviceId === s.id ? "choice selected" : "choice"
                    }
                  >
                    <input
                      type="radio"
                      name="service"
                      value={s.id}
                      checked={draft.serviceId === s.id}
                      onChange={() => change("serviceId", s.id)}
                      required
                    />
                    <span>{s.name}</span>
                  </label>
                ))}
              </fieldset>
              <p className="fineprint">
                No prices or service availability are assumed. Your quote
                follows our review.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <p className="form-copy">
                Select what applies. This helps us prepare; it does not add
                charges.
              </p>
              <fieldset className="condition-choices">
                <legend className="sr-only">Vehicle condition</legend>
                {conditionOptions.map((c) => (
                  <label
                    key={c}
                    className={
                      draft.conditions.includes(c)
                        ? "choice selected"
                        : "choice"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={draft.conditions.includes(c)}
                      onChange={(e) =>
                        change(
                          "conditions",
                          e.target.checked
                            ? [...draft.conditions, c]
                            : draft.conditions.filter((v) => v !== c),
                        )
                      }
                    />
                    <span>{c}</span>
                  </label>
                ))}
              </fieldset>
              <label className="field">
                Anything else? (optional)
                <textarea
                  maxLength={1200}
                  value={draft.notes}
                  onChange={(e) => change("notes", e.target.value)}
                  rows={4}
                  placeholder="Tell us about any areas you’d like us to focus on."
                />
              </label>
            </>
          )}
          {step === 3 && (
            <>
              <p className="form-copy">
                Enter the location where you’d like the detail. We’ll confirm
                exact coverage with you.
              </p>
              <div className="field-grid">
                <label className="field full">
                  Your region
                  <select
                    value={draft.location.market}
                    onChange={(e) =>
                      change("location", {
                        ...draft.location,
                        market: e.target.value as Draft["location"]["market"],
                      })
                    }
                  >
                    {serviceAreas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Field
                  className="full"
                  label="Street address"
                  name="street-address"
                  autoComplete="street-address"
                  value={draft.location.address}
                  onChange={(v) =>
                    change("location", { ...draft.location, address: v })
                  }
                  maxLength={160}
                />
                <Field
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  value={draft.location.city}
                  onChange={(v) =>
                    change("location", { ...draft.location, city: v })
                  }
                  maxLength={80}
                />
                <Field
                  label="ZIP code"
                  name="zip"
                  autoComplete="postal-code"
                  value={draft.location.zip}
                  onChange={(v) =>
                    change("location", { ...draft.location, zip: v })
                  }
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  maxLength={5}
                />
              </div>
              <p className="notice">
                Your address will be reviewed for service coverage. Choosing a
                region does not guarantee availability.
              </p>
            </>
          )}
          {step === 4 && (
            <>
              <p className="form-copy">
                Choose a preferred date and time of day. These are requests, not
                live appointment slots.
              </p>
              <div className="field-grid">
                <Field
                  label="Preferred date"
                  name="date"
                  type="date"
                  min={arkansasDate()}
                  max={`${new Date().getFullYear() + 1}-12-31`}
                  value={draft.preference.date}
                  onChange={(v) =>
                    change("preference", { ...draft.preference, date: v })
                  }
                />
                <label className="field">
                  Time of day
                  <select
                    value={draft.preference.window}
                    onChange={(e) =>
                      change("preference", {
                        ...draft.preference,
                        window: e.target.value as Draft["preference"]["window"],
                      })
                    }
                  >
                    {timeWindows.map((w) => (
                      <option key={w}>{w}</option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="notice">
                All times refer to Arkansas local time. We’ll contact you to
                agree on an available appointment.
              </p>
            </>
          )}
          {step === 5 && (
            <>
              <p className="form-copy">
                We’ll use these details to follow up on your request.
              </p>
              <div className="field-grid">
                <Field
                  label="First name"
                  name="first-name"
                  autoComplete="given-name"
                  value={draft.customer.firstName}
                  onChange={(v) =>
                    change("customer", { ...draft.customer, firstName: v })
                  }
                  maxLength={60}
                />
                <Field
                  label="Last name"
                  name="last-name"
                  autoComplete="family-name"
                  value={draft.customer.lastName}
                  onChange={(v) =>
                    change("customer", { ...draft.customer, lastName: v })
                  }
                  maxLength={60}
                />
                <Field
                  label="Mobile phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={draft.customer.phone}
                  onChange={(v) =>
                    change("customer", { ...draft.customer, phone: v })
                  }
                  maxLength={25}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={draft.customer.email}
                  onChange={(v) =>
                    change("customer", { ...draft.customer, email: v })
                  }
                  maxLength={254}
                />
              </div>
            </>
          )}
          {step === 6 && (
            <>
              <p className="form-copy">
                Check your details before sending your request.
              </p>
              {summary}
              <button type="button" className="edit-link" onClick={() => go(0)}>
                Edit request
              </button>
              <label className="consent">
                <input
                  type="checkbox"
                  required
                  checked={draft.consent}
                  onChange={(e) => change("consent", e.target.checked)}
                />
                <span>
                  I agree to be contacted about this request and have read the{" "}
                  <Link href="/privacy" target="_blank">
                    privacy framework
                  </Link>{" "}
                  and{" "}
                  <Link href="/terms" target="_blank">
                    request terms
                  </Link>
                  . This does not confirm an appointment.
                </span>
              </label>
            </>
          )}
          <div className="honeypot" aria-hidden="true">
            <label>
              Website
              <input
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={draft.website}
                onChange={(e) => change("website", e.target.value)}
              />
            </label>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <div className="form-actions">
            {step > 0 && (
              <button
                className="back-button"
                type="button"
                disabled={busy}
                onClick={() => go(step - 1)}
              >
                <ArrowLeft size={17} /> Back
              </button>
            )}
            <button type="submit" className="button" disabled={busy}>
              {busy
                ? "Saving your request…"
                : step === 6
                  ? "Request appointment"
                  : "Continue"}
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="fineprint">
            No payment required to request. No appointment is confirmed yet.
          </p>
        </form>
      </div>
    </section>
  );
}
function Field({
  label,
  value,
  onChange,
  className = "",
  required = true,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> & {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`field ${className}`}>
      {label}
      <input
        {...props}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
