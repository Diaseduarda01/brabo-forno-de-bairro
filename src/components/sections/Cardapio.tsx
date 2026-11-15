import { cardapioDemo, pedidoUrl, pizzas } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";
import { BrandLink } from "@/components/site/BrandButton";

const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function Cardapio({ asPage = false }: { asPage?: boolean }) {
  return (
    <section id="cardapio" className="texture-coal py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionTitle as={asPage ? "h1" : "h2"} eyebrow="Cardápio em destaque" title="As brabas da casa." />
          {cardapioDemo && <p className="reveal max-w-xs border-l-2 border-brick pl-4 text-sm text-muted-foreground">Sabores de demonstração — o cardápio oficial chega em breve. Enquanto isso, confira no nosso Instagram.</p>}
        </div>
        <ul className="mt-16 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-3">
          {pizzas.map((p, i) => (
            <li key={p.nome} className="reveal group flex flex-col bg-coal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative overflow-hidden">
                <img src={p.imagem} alt={p.nome} width={1024} height={1024} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {p.tag && <span className="absolute left-0 top-6 bg-brick px-4 py-1.5 font-serif text-xs font-semibold uppercase tracking-[0.3em] text-cream">{p.tag}</span>}
              </div>
              <div className="flex flex-1 flex-col p-7 lg:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl uppercase text-gold">{p.nome}</h3>
                  {p.preco != null && <span className="font-callout text-xl font-bold text-cream">{brl(p.preco)}</span>}
                </div>
                <div className="my-5 h-px w-12 bg-gold/50 transition-all duration-500 group-hover:w-24" />
                <p className="flex-1 leading-relaxed text-muted-foreground">{p.descricao}</p>
                <BrandLink href={pedidoUrl(`Oi! Quero uma ${p.nome} 🍕`)} variant="outline" size="sm" className="mt-7 self-start">Quero essa</BrandLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
