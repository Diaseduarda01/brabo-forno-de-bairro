import { Clock, Instagram, MapPin, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { enderecoTexto, pizzaria, whatsappUrl } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";
import { BrandLink } from "@/components/site/BrandButton";

function Item({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-b border-coal/15 py-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brick text-brick">{icon}</span>
      <div><p className="font-serif text-xs font-bold uppercase tracking-[0.3em] text-brick">{label}</p><div className="mt-1 text-lg">{children}</div></div>
    </div>
  );
}

export function Contato({ asPage = false }: { asPage?: boolean }) {
  const end = enderecoTexto();
  const wa = whatsappUrl();
  const soon = <span className="italic opacity-70">Em breve por aqui — acompanhe no Instagram</span>;
  return (
    <section id="contato" className="texture-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <header className="reveal">
            <p className="eyebrow !text-brick">Contato e localização</p>
            {asPage ? <h1 className="title-display mt-5 text-5xl !text-coal sm:text-6xl">Chega mais.</h1> : <h2 className="title-display mt-5 text-5xl !text-coal sm:text-6xl">Chega mais.</h2>}
            <p className="mt-5 text-lg opacity-80">Vem pra cá ou chama a gente. A casa é sua ❤️</p>
          </header>
          <div className="reveal mt-8">
            <Item icon={<MapPin className="h-5 w-5" strokeWidth={1.25} />} label="Endereço">{end ?? soon}</Item>
            <Item icon={<Clock className="h-5 w-5" strokeWidth={1.25} />} label="Horário">
              {pizzaria.horarios ? <ul>{pizzaria.horarios.map((h) => <li key={h.dias}>{h.dias}: {h.horas}</li>)}</ul> : soon}
            </Item>
            <Item icon={<MessageCircle className="h-5 w-5" strokeWidth={1.25} />} label="WhatsApp">
              {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Chamar no WhatsApp</a> : soon}
            </Item>
            <Item icon={<Instagram className="h-5 w-5" strokeWidth={1.25} />} label="Instagram">
              <a href={pizzaria.instagram.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{pizzaria.instagram.handle}</a>
            </Item>
          </div>
        </div>
        <div className="reveal min-h-[22rem]">
          {end ? (
            <iframe title={`Mapa — ${pizzaria.nome}`} src={`https://www.google.com/maps?q=${encodeURIComponent(end)}&output=embed`} loading="lazy" className="h-full min-h-[22rem] w-full border-0 grayscale" />
          ) : (
            <div className="texture-brick flex h-full min-h-[22rem] flex-col items-center justify-center gap-5 p-10 text-center">
              <MapPin className="h-12 w-12 text-gold" strokeWidth={1} />
              <p className="font-display text-2xl uppercase text-gold">Mapa em breve</p>
              <p className="max-w-xs text-muted-foreground">Enquanto isso, chama a gente no Instagram que a gente te explica o caminho.</p>
              <BrandLink href={pizzaria.instagram.url} variant="outline" size="sm"><Instagram className="h-4 w-4" />Ver Instagram</BrandLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
