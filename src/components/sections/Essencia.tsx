import { imagens } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";

export function Essencia({ asPage = false }: { asPage?: boolean }) {
  return (
    <section id="historia" className="texture-brick relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="relative lg:col-span-5">
          <img src={imagens.dough} alt="Mãos abrindo a massa de pizza artesanalmente" width={1024} height={1280} loading="lazy" className="reveal aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-6 -right-4 hidden h-40 w-40 border border-gold/60 lg:block" aria-hidden />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionTitle as={asPage ? "h1" : "h2"} eyebrow="Nossa essência" title="Mais que pizza. É nosso jeito de receber." />
          <div className="reveal mt-8 gold-rule w-32" />
          <p className="reveal mt-8 font-serif text-2xl leading-relaxed text-cream sm:text-[1.7rem]">
            Por aqui, cada pizza carrega cuidado, sabor e aquele carinho de quem prepara tudo pensando em você. A gente acredita no valor da boa comida, no calor do forno a lenha e nos momentos que ficam na memória.
          </p>
          <p className="reveal mt-8 font-callout text-xl font-bold text-ember">Vem pra cá. Vocês fazem parte disso ❤️</p>
        </div>
      </div>
    </section>
  );
}
