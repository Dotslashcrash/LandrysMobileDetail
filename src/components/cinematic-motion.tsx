"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function CinematicMotion() {
  const path = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    const frames = document.querySelectorAll<HTMLElement>(
      "[data-image-motion]",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("image-arrived");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    frames.forEach((frame) => observer.observe(frame));
    const hero = document.querySelector<HTMLElement>(".commercial-hero");
    let frameId = 0;
    const move = () => {
      if (frameId || !hero) return;
      frameId = requestAnimationFrame(() => {
        hero.style.setProperty(
          "--image-drift",
          `${Math.min(window.scrollY * 0.035, 22)}px`,
        );
        frameId = 0;
      });
    };
    window.addEventListener("scroll", move, { passive: true });
    const stop = () => {
      if (preference.matches) {
        window.removeEventListener("scroll", move);
        if (hero) hero.style.removeProperty("--image-drift");
      }
    };
    preference.addEventListener("change", stop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", move);
      preference.removeEventListener("change", stop);
      if (hero) hero.style.removeProperty("--image-drift");
    };
  }, [path]);
  return null;
}
