import { cardapioDemo, outrosSabores, pedidoUrl, pizzaria, pizzas } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";
import { BrandLink } from "@/components/site/BrandButton";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function Cardapio({ asPage = false }: { asPage?: boolean }) {
  // Home: só os destaques. /cardapio: todos os sabores com foto + os que ainda não têm foto.
  const lista = asPage ? pizzas : pizzas.filter((p) => p.destaque);
  const noApp = pizzaria.linkPedidos != null;
  return (
    <section id="cardapio" className="texture-coal py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle as={asPage ? "h1" : "h2"} eyebrow={asPage ? "Cardápio" : "Cardápio em destaque"} title="As brabas da casa." />
          {cardapioDemo && (
            <p className="reveal max-w-xs border-l-2 border-brick pl-4 text-sm text-muted-foreground">
              {asPage ? "Esses são os sabores que a gente mostra no Instagram." : "Esses são os que o bairro mais pede."}{" "}
              O cardápio inteiro, com preço e tamanho,{" "}
              <a href={pedidoUrl()} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline underline-offset-4 hover:text-cream">
                {noApp ? "tá no app" : "é só pedir pra gente"}
              </a>.
            </p>
          )}
        </div>
        <ul className="mt-16 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p, i) => (
            <li key={p.nome} className="reveal group flex flex-col bg-coal" style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
              <div className="overflow-hidden">
                <img src={p.imagem} alt={p.alt} width={580} height={290} loading="lazy" className="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl uppercase text-gold">{p.nome}</h3>
                  {p.preco != null && <span className="font-callout text-xl font-bold text-cream">{brl(p.preco)}</span>}
                </div>
                <div className="my-4 h-px w-12 bg-gold/50 transition-all duration-500 group-hover:w-24" />
                {p.descricao ? <p className="flex-1 leading-relaxed text-muted-foreground">{p.descricao}</p> : <div className="flex-1" />}
                <BrandLink href={pedidoUrl(`Oi! Quero uma ${p.nome}`)} variant="outline" size="sm" className="mt-5 self-start">Quero essa</BrandLink>
              </div>
            </li>
          ))}
        </ul>
        {asPage && outrosSabores.length > 0 && (
          <div className="reveal mt-16 border-t border-gold/20 pt-10">
            <p className="eyebrow">Tem mais</p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {outrosSabores.map((s) => (
                <li key={s.nome}>
                  <p className="font-display text-xl uppercase text-gold">{s.nome}</p>
                  {s.descricao && <p className="mt-1 text-muted-foreground">{s.descricao}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
