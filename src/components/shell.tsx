"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { branding } from "@/data/business";
import { readAttribution } from "@/lib/analytics";
const links = [
  ["Services", "/services"],
  ["The Results", "/results"],
  ["How It Works", "/#process"],
  ["Service Area", "/service-area"],
] as const;
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    readAttribution();
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <header
        className={`header ${scrolled || path !== "/" || open ? "solid" : ""}`}
      >
        <Link
          href="/"
          className="wordmark"
          aria-label="Landry’s Mobile Detail home"
        >
          LANDRY’S<span>MOBILE DETAIL</span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <Link
              aria-current={path === href ? "page" : undefined}
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/book" className="button small header-book">
          Book now <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        {open && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[...links, ["About", "/about"], ["Contact", "/contact"]].map(
              ([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}>
                  {label}
                  <ArrowUpRight size={18} />
                </Link>
              ),
            )}
            <Link
              className="button"
              href="/book"
              onClick={() => setOpen(false)}
            >
              Book your detail
            </Link>
          </nav>
        )}
      </header>
      {scrolled && path !== "/book" && (
        <Link href="/book" className="mobile-book button">
          Book your detail <ArrowUpRight size={18} />
        </Link>
      )}
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link href="/" className="wordmark">
          LANDRY’S<span>MOBILE DETAIL</span>
        </Link>
        <p>
          {branding.statement}
          <br />
          <span>{branding.region}</span>
        </p>
        <Link href="/book" className="text-link">
          Let’s get your car on the calendar <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Landry’s Mobile Detail</span>
        <nav aria-label="Footer navigation">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
        <span>ARKANSAS. AT YOUR ADDRESS.</span>
      </div>
    </footer>
  );
}
