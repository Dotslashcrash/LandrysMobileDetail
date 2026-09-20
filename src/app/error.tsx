"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section page-intro">
      <p className="eyebrow">A MOMENTARY DETOUR</p>
      <h1>
        LET’S TRY
        <br />
        <em>THAT AGAIN.</em>
      </h1>
      <p>We couldn’t load this page. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
