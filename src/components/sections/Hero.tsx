import { Link } from "@tanstack/react-router";
import { imagens, pedidoUrl } from "@/data/pizzaria";
import { BrandLink, brandButton } from "@/components/site/BrandButton";
import { Seal } from "@/components/site/Seal";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden lg:items-center">
      <img src={imagens.heroPizza} alt="Pizza artesanal com bordas tostadas saindo do forno a lenha" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]" />
      <div className="hero-veil absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:py-24">
        <div className="max-w-2xl animate-rise">
          <p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-ember" />Pizzaria artesanal · Forno a lenha</p>
          <h1 className="title-display mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">No fogo, a gente faz história.</h1>
          <p className="mt-7 max-w-lg font-callout text-xl font-bold leading-snug text-foreground sm:text-2xl">Pizza artesanal, massa de longa fermentação e aquele sabor que faz você querer voltar.</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BrandLink href={pedidoUrl()}>Bora pedir? 🍕</BrandLink>
            <Link to="/historia" className={brandButton({ variant: "outline" })}>Conheça nossa história</Link>
          </div>
        </div>
      </div>
      <Seal className="absolute right-6 top-8 hidden w-36 text-gold md:block lg:right-16 lg:top-auto lg:bottom-16 lg:w-44" />
    </section>
  );
}
