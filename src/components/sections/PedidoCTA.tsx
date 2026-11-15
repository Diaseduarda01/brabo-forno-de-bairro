import { imagens, pedidoUrl } from "@/data/pizzaria";
import { BrandLink } from "@/components/site/BrandButton";
import { Seal } from "@/components/site/Seal";

export function PedidoCTA() {
  return (
    <section className="texture-coal relative overflow-hidden border-y border-gold/20">
      <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
        <div className="reveal px-5 py-20 lg:px-8 lg:py-28">
          <p className="eyebrow">Bora?</p>
          <h2 className="title-display mt-5 text-5xl sm:text-6xl lg:text-7xl">Já deu fome, né?</h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Então bora resolver isso! Escolha sua pizza favorita e deixa o resto com a gente.</p>
          <BrandLink href={pedidoUrl()} className="mt-10">Fazer meu pedido 🔥</BrandLink>
        </div>
        <div className="relative h-80 sm:h-[28rem] lg:h-full lg:min-h-[36rem]">
          <img src={imagens.pepperoni} alt="Pizza de pepperoni com borda tostada" width={1024} height={1024} loading="lazy" className="h-full w-full object-cover" />
          <Seal text="ESSA É BRABA • DO FORNO PRA VOCÊ • " className="absolute -left-10 top-1/2 hidden w-36 -translate-y-1/2 text-gold lg:block" />
        </div>
      </div>
    </section>
  );
}
