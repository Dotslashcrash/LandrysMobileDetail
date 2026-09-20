"use client";
import Image from "next/image";
import { useState } from "react";
export function Comparison({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50);
  return (
    <div className="comparison">
      <Image
        src={before}
        alt={`Before: ${alt}`}
        fill
        sizes="(max-width:800px) 100vw, 80vw"
      />
      <div
        className="after"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={after}
          alt={`After: ${alt}`}
          fill
          sizes="(max-width:800px) 100vw, 80vw"
        />
      </div>
      <div className="compare-handle" style={{ left: `${position}%` }}>
        <span>↔</span>
      </div>
      <div className="compare-labels">
        <span>AFTER</span>
        <span>BEFORE</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label={`Compare before and after: ${alt}`}
        aria-valuetext={`${position}% of the after image visible`}
      />
    </div>
  );
}
