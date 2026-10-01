"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="section page-intro">
      <h1>We couldn’t load this page.</h1>
      <button className="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
