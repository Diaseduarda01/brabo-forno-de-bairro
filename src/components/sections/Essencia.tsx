import { Link } from "@tanstack/react-router";
import { imagens, pizzaria } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";

const numero = (n: number) => ["zero", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"][n] ?? String(n);

export function Essencia({ asPage = false }: { asPage?: boolean }) {
  const { desde, salao, endereco } = pizzaria;
  // Só fatos confirmados nos posts da pizzaria. A história completa (quem, de onde) está pendente com o dono.
  const frases = [
    desde ? `O Brabo é de ${desde}.` : null,
    endereco ? `Cresceu pedido a pedido e agora tem casa nova na ${endereco.rua.replace(/^R\. /, "")}.` : null,
    salao ? `São ${numero(salao.mesas)} mesas, ${salao.lugares} lugares e o forno a lenha ali do lado.` : null,
    "A gente deixa a massa descansar 24h antes de ir pro fogo.",
  ].filter(Boolean);

  return (
    <section id="historia" className="texture-brick relative overflow-hidden py-24 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="relative isolate order-2 mr-3 mb-3 lg:order-1 lg:col-span-5 lg:mr-5 lg:mb-5">
          {/* Moldura dourada do tamanho da foto, deslocada para baixo e para a direita, por trás dela: profundidade sem sombra. */}
          <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 border border-gold/60 lg:translate-x-5 lg:translate-y-5" aria-hidden />
          <img src={imagens.massaPizzaiolo} alt="Pizzaiolo do Brabo sorrindo e mostrando uma bola de massa" width={1024} height={1280} loading="lazy" className="reveal aspect-[4/5] w-full object-cover" />
        </div>
        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <SectionTitle as={asPage ? "h1" : "h2"} eyebrow="Nossa história" title="Começou pequeno. Hoje tem salão." />
          <div className="reveal mt-8 gold-rule w-32" />
          <p className="reveal mt-8 font-serif text-2xl leading-relaxed text-cream sm:text-[1.7rem]">{frases.join(" ")}</p>
          <Link to="/contato" className="reveal mt-8 inline-block font-callout text-xl font-bold text-ember underline-offset-8 hover:underline">Vem conhecer o salão novo.</Link>
        </div>
      </div>
    </section>
  );
}
