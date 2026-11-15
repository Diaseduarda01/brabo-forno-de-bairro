import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, pedidoUrl } from "@/data/pizzaria";
import { Logo } from "./Logo";
import { BrandLink } from "./BrandButton";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  return (
    <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? "border-gold/25 bg-coal/95 backdrop-blur" : "border-transparent bg-coal"}`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" onClick={() => setOpen(false)}><Logo /></Link>
        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} activeOptions={{ exact: true }} className="font-serif text-sm font-semibold uppercase tracking-[0.22em] text-cream/80 transition-colors hover:text-gold" activeProps={{ className: "!text-gold" }}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <BrandLink href={pedidoUrl()} size="sm" className="hidden sm:inline-flex">Fazer meu pedido</BrandLink>
          <button className="p-2 text-gold lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open}>
            {open ? <X className="h-7 w-7" strokeWidth={1.25} /> : <Menu className="h-7 w-7" strokeWidth={1.25} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="texture-coal fixed inset-x-0 top-20 bottom-0 z-40 flex flex-col border-t border-gold/20 px-6 py-10 lg:hidden animate-rise">
          <ul className="flex flex-col gap-6">
            {navLinks.map((l, i) => (
              <li key={l.to} className="border-b border-gold/15 pb-5">
                <Link to={l.to} onClick={() => setOpen(false)} className="flex items-baseline gap-4 font-display text-3xl uppercase text-cream" activeOptions={{ exact: true }} activeProps={{ className: "!text-gold" }}>
                  <span className="font-serif text-sm text-brick">0{i + 1}</span>{l.label}
                </Link>
              </li>
            ))}
          </ul>
          <BrandLink href={pedidoUrl()} className="mt-auto w-full">Fazer meu pedido 🔥</BrandLink>
        </div>
      )}
    </header>
  );
}
