"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { branding, contact } from "@/data/business";
import { readAttribution } from "@/lib/analytics";
const links = [
  ["Services", "/services"],
  ["Results", "/results"],
  ["How it works", "/#process"],
  ["Service area", "/service-area"],
  ["Contact", "/contact"],
] as const;
export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    readAttribution();
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
      <header className="header">
        <Link
          href="/"
          className="brand-logo"
          aria-label="Landry’s Mobile Detail home"
        >
          <Image
            src="/brand/logo.webp"
            alt="Landry’s Mobile Detail"
            width={960}
            height={243}
            sizes="(max-width: 480px) 150px, (max-width: 1100px) 200px, 240px"
            loading="eager"
          />
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
          Book now
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
            {[...links, ["About", "/about"]].map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
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
    </>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Link
          href="/"
          className="brand-logo footer-logo"
          aria-label="Landry’s Mobile Detail home"
        >
          <Image
            src="/brand/logo-family.webp"
            alt="Landry’s Mobile Detail — A Stidham Family Co."
            width={1200}
            height={338}
            sizes="280px"
          />
        </Link>
        <p>
          {branding.region}
          {contact.email && (
            <>
              <br />
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          )}
        </p>
        <Link href="/book" className="text-link">
          Request a detail
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
      </div>
    </footer>
  );
}
