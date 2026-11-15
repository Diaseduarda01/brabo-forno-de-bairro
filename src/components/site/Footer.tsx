import { Link } from "@tanstack/react-router";
import { Icon } from "@/components/site/Icon";
import { mapsUrl, navLinks, pedidoUrl, pizzaria, telefoneUrl, whatsappTexto, whatsappUrl } from "@/data/pizzaria";
import { Logo } from "./Logo";
import { BrandLink } from "./BrandButton";

export function Footer() {
  const wa = whatsappUrl();
  const tel = telefoneUrl();
  const mapa = mapsUrl();
  return (
    <footer className="texture-coal border-t border-gold/20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-3 lg:px-8">
        <div>
          <Logo grande className="h-28 w-28" />
          <p className="mt-5 max-w-xs font-serif text-lg italic text-cream/70">Massa de 24h e forno a lenha.</p>
          {pizzaria.endereco && (
            <a href={mapa ?? undefined} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-start gap-3 text-cream/80 hover:text-gold">
              <Icon name="location_on" className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{pizzaria.endereco.rua}{pizzaria.endereco.cidade ? `, ${pizzaria.endereco.cidade}` : ""}</span>
            </a>
          )}
          <BrandLink href={pedidoUrl()} size="sm" className="mt-6">Bora pedir</BrandLink>
        </div>
        <nav aria-label="Rodapé">
          <p className="eyebrow">Navegue</p>
          <ul className="mt-5 grid grid-cols-2 gap-3">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="text-cream/80 hover:text-gold">{l.label}</Link></li>)}
          </ul>
        </nav>
        <div className="space-y-4">
          <p className="eyebrow">Fala com a gente</p>
          <a href={pizzaria.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold"><Icon name="instagram" className="h-5 w-5" />{pizzaria.instagram.handle}</a>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-cream/80 hover:text-gold"><Icon name="whatsapp" className="h-5 w-5" />{whatsappTexto() ?? "WhatsApp"}</a>}
          {tel && <a href={tel} className="flex items-center gap-3 text-cream/80 hover:text-gold"><Icon name="call" className="h-5 w-5" />{pizzaria.telefone}</a>}
          <div className="flex items-start gap-3 text-cream/80"><Icon name="schedule" className="mt-0.5 h-5 w-5 shrink-0" />
            {pizzaria.horarios ? <ul>{pizzaria.horarios.map((h) => <li key={h.dias}>{h.dias}: {h.horas}</li>)}</ul> : <span>Horários no nosso Instagram</span>}
          </div>
        </div>
      </div>
      <div className="gold-rule" />
      <p className="px-5 py-6 text-center text-[0.8125rem] uppercase tracking-[0.2em] text-cream/70">© {new Date().getFullYear()} {pizzaria.nome}{pizzaria.desde ? ` · Desde ${pizzaria.desde}` : ""}</p>
    </footer>
  );
}
