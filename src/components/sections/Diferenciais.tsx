import { Clock, Leaf, Flame, Hand } from "lucide-react";
import { imagens } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";

const itens = [
  { icon: Clock, t: "Longa fermentação", d: "Massa que descansa sem pressa. Leve, aerada e cheia de sabor." },
  { icon: Leaf, t: "Ingredientes selecionados", d: "Escolhidos a dedo, frescos, do jeito que tem que ser." },
  { icon: Flame, t: "Forno a lenha", d: "Fogo de verdade. Borda tostada e aquele perfume que não tem igual." },
  { icon: Hand, t: "Preparação artesanal", d: "Aberta à mão, montada com carinho, uma por uma." },
];

export function Diferenciais() {
  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-36">
      <img src={imagens.oven} alt="" width={1280} height={960} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-coal/80" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle align="center" eyebrow="Nosso jeito" title="Feita com calma. Assada com paixão." />
        <ol className="relative mt-20 grid gap-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="absolute left-0 right-0 top-12 hidden gold-rule lg:block" aria-hidden />
          {itens.map(({ icon: Icon, t, d }, i) => (
            <li key={t} className={`reveal relative flex flex-col items-center text-center ${i % 2 ? "lg:mt-16" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-cream text-brick ring-1 ring-gold ring-offset-4 ring-offset-coal">
                <Icon className="h-10 w-10" strokeWidth={1} />
              </span>
              <span className="mt-6 font-serif text-sm tracking-[0.3em] text-brick">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl uppercase text-gold">{t}</h3>
              <p className="mt-3 max-w-[16rem] text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
