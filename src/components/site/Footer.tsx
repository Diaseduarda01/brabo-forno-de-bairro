import { Link } from "@tanstack/react-router";
import { Instagram, MessageCircle, Clock } from "lucide-react";
import { navLinks, pizzaria, whatsappUrl } from "@/data/pizzaria";
import { Logo } from "./Logo";

export function Footer() {
  const wa = whatsappUrl();
  return (
    <footer className="texture-coal border-t border-gold/20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs font-serif text-lg italic text-cream/70">No fogo, a gente faz história. Feita com carinho, do forno pra sua mesa ❤️</p>
        </div>
        <nav aria-label="Rodapé">
          <p className="eyebrow">Navegue</p>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="text-cream/80 hover:text-gold">{l.label}</Link></li>)}
          </ul>
        </nav>
        <div className="space-y-4">
          <p className="eyebrow">Fala com a gente</p>
          <a href={pizzaria.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold"><Instagram className="h-5 w-5" strokeWidth={1.25} />{pizzaria.instagram.handle}</a>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold"><MessageCircle className="h-5 w-5" strokeWidth={1.25} />WhatsApp</a>}
          <div className="flex items-start gap-3 text-cream/80"><Clock className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.25} />
            {pizzaria.horarios ? <ul>{pizzaria.horarios.map((h) => <li key={h.dias}>{h.dias}: {h.horas}</li>)}</ul> : <span>Horários no nosso Instagram</span>}
          </div>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="px-5 py-6 text-center text-xs uppercase tracking-[0.25em] text-cream/50">© {new Date().getFullYear()} {pizzaria.nome} · Feita com 🔥 e carinho</p>
    </footer>
  );
}
