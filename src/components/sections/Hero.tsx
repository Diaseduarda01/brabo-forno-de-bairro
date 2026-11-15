import { Link } from "@tanstack/react-router";
import { imagens, pedidoUrl, pizzaria } from "@/data/pizzaria";
import { BrandLink, brandButton } from "@/components/site/BrandButton";
import { Seal } from "@/components/site/Seal";

/** SPEC-03: onde, quando e entrega logo abaixo do hero. Item sem dado não aparece. */
function FaixaInfo() {
  const itens = [
    pizzaria.endereco?.rua,
    pizzaria.horarioResumo,
    pizzaria.entrega ? `Entrega até ${pizzaria.entrega.raioKm} km` : null,
    pizzaria.salao ? "Salão e retirada" : null,
  ].filter(Boolean) as string[];
  if (!itens.length) return null;
  return (
    <div className="border-y border-gold/20 bg-coal-soft">
      <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-4 sm:gap-x-4 text-center font-serif text-sm font-semibold uppercase tracking-[0.15em] text-cream lg:px-8">
        {itens.map((t, i) => (
          <li key={t} className="flex items-center gap-4">
            {i > 0 && <span className="hidden h-1 w-1 rounded-full bg-gold sm:block" aria-hidden />}
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden lg:items-center">
        <img src={imagens.heroPizza} alt="Pizza artesanal com bordas tostadas saindo do forno a lenha" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]" />
        <div className="hero-veil absolute inset-0 -z-10" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32 lg:px-8 lg:py-24">
          <div className="max-w-2xl animate-rise">
            <p className="eyebrow flex items-center gap-4"><span className="h-px w-10 bg-ember" />Pizzaria artesanal · Forno a lenha</p>
            <h1 className="title-display mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl">No fogo, a gente faz história.</h1>
            <p className="mt-7 max-w-lg font-callout text-xl font-bold leading-snug text-foreground sm:text-2xl">Massa que descansa 24h antes de ir pro forno a lenha. Salão, delivery e retirada.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <BrandLink href={pedidoUrl()}>Bora pedir</BrandLink>
              <Link to="/cardapio" className={brandButton({ variant: "outline" })}>Ver o cardápio</Link>
            </div>
          </div>
        </div>
        <Seal className="absolute right-6 top-8 hidden w-36 text-gold md:block lg:right-16 lg:top-auto lg:bottom-16 lg:w-44" />
      </section>
      <FaixaInfo />
    </>
  );
}
