import { imagens, pedidoUrl, pizzaria, whatsappUrl } from "@/data/pizzaria";
import { BrandLink } from "@/components/site/BrandButton";
import { Icon } from "@/components/site/Icon";
import { Seal } from "@/components/site/Seal";

export function PedidoCTA() {
  const wa = whatsappUrl();
  const entrega = pizzaria.entrega ? ` A gente entrega até ${pizzaria.entrega.raioKm} km.` : "";
  return (
    <section className="texture-coal relative overflow-hidden border-y border-gold/20">
      <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
        <div className="reveal px-5 py-20 lg:px-8 lg:py-28">
          <p className="eyebrow">Bora?</p>
          <h2 className="title-display mt-5 text-5xl sm:text-6xl lg:text-7xl">Já deu fome, né?</h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Pede pelo app, chama no WhatsApp ou passa aqui.{entrega}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BrandLink href={pedidoUrl()}>Fazer meu pedido</BrandLink>
            {wa && pizzaria.linkPedidos && <BrandLink href={wa} variant="outline"><Icon name="whatsapp" className="h-4 w-4" />Chamar no WhatsApp</BrandLink>}
          </div>
        </div>
        <div className="relative aspect-[4/5] sm:aspect-auto sm:h-[34rem] lg:h-full lg:min-h-[36rem]">
          <img src={imagens.fatiaAzeitona} alt="Fatia da 4 queijos com azeitona, queijo escorrendo" width={1024} height={1280} loading="lazy" className="h-full w-full object-cover object-[center_40%]" />
          <Seal text="ESSA É BRABA • DO FORNO PRA VOCÊ • " className="absolute -left-10 top-1/2 hidden w-36 -translate-y-1/2 text-gold lg:block" />
        </div>
      </div>
    </section>
  );
}
