import { Icon } from "@/components/site/Icon";
import type { ReactNode } from "react";
import { enderecoTexto, mapsUrl, pedidoUrl, pizzaria, telefoneUrl, whatsappTexto, whatsappUrl } from "@/data/pizzaria";
import { BrandLink } from "@/components/site/BrandButton";

function Item({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-5 border-b border-coal/15 py-6">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-brick text-brick">{icon}</span>
      <div><p className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-brick">{label}</p><div className="mt-1 text-lg">{children}</div></div>
    </div>
  );
}

const link = "font-bold underline-offset-4 hover:underline";

export function Contato({ asPage = false }: { asPage?: boolean }) {
  const end = enderecoTexto();
  const mapa = mapsUrl();
  const wa = whatsappUrl();
  const tel = telefoneUrl();
  const { entrega } = pizzaria;
  const soon = <span className="italic opacity-70">Em breve por aqui — acompanhe no Instagram</span>;
  return (
    <section id="contato" className="texture-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <header className="reveal">
            <p className="eyebrow !text-brick">Contato e localização</p>
            {asPage ? <h1 className="title-display mt-5 text-5xl !text-coal sm:text-6xl">Chega mais.</h1> : <h2 className="title-display mt-5 text-5xl !text-coal sm:text-6xl">Chega mais.</h2>}
            <p className="mt-5 text-lg opacity-80">Vem pra cá ou chama a gente. A casa é sua.</p>
          </header>
          <div className="reveal mt-8">
            <Item icon={<Icon name="location_on" className="h-5 w-5" />} label="Endereço">
              {end ?? soon}
              {mapa && <a href={mapa} target="_blank" rel="noopener noreferrer" className={`mt-1 block text-base text-brick ${link}`}>Como chegar</a>}
              {entrega && (
                <p className="mt-3 text-base opacity-80">
                  Entrega até {entrega.raioKm} km{entrega.taxa ? ` (taxa: ${entrega.taxa})` : ""}.
                  {entrega.apps.length > 0 && ` Também no ${new Intl.ListFormat("pt-BR", { type: "conjunction" }).format(entrega.apps)}.`}
                </p>
              )}
            </Item>
            <Item icon={<Icon name="schedule" className="h-5 w-5" />} label="Horário">
              {pizzaria.horarios ? <ul>{pizzaria.horarios.map((h) => <li key={h.dias}>{h.dias}: {h.horas}</li>)}</ul> : soon}
            </Item>
            <Item icon={<Icon name="whatsapp" className="h-5 w-5" />} label="WhatsApp">
              {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className={link}>{whatsappTexto() ?? "Chamar no WhatsApp"}</a> : soon}
            </Item>
            {tel && (
              <Item icon={<Icon name="call" className="h-5 w-5" />} label="Telefone">
                <a href={tel} className={link}>{pizzaria.telefone}</a>
              </Item>
            )}
            <Item icon={<Icon name="instagram" className="h-5 w-5" />} label="Instagram">
              <a href={pizzaria.instagram.url} target="_blank" rel="noopener noreferrer" className={link}>{pizzaria.instagram.handle}</a>
            </Item>
            <BrandLink href={pedidoUrl()} className="mt-8">Bora pedir</BrandLink>
          </div>
        </div>
        <div className="reveal min-h-[22rem]">
          {end ? (
            <iframe title={`Mapa — ${pizzaria.nome}`} src={`https://www.google.com/maps?q=${encodeURIComponent(end)}&output=embed`} loading="lazy" className="h-full min-h-[22rem] w-full border-0" />
          ) : (
            <div className="texture-brick flex h-full min-h-[22rem] flex-col items-center justify-center gap-5 p-10 text-center">
              <Icon name="location_on" className="h-12 w-12 text-gold" />
              <p className="font-display text-2xl uppercase text-gold">Mapa em breve</p>
              <p className="max-w-xs text-muted-foreground">Enquanto isso, chama a gente no Instagram que a gente te explica o caminho.</p>
              <BrandLink href={pizzaria.instagram.url} variant="outline" size="sm"><Icon name="instagram" className="h-4 w-4" />Ver Instagram</BrandLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
