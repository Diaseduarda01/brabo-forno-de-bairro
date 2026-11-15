import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { pizzaria } from "@/data/pizzaria";
import { Hero } from "@/components/sections/Hero";
import { Essencia } from "@/components/sections/Essencia";
import { Cardapio } from "@/components/sections/Cardapio";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Galeria } from "@/components/sections/Galeria";
import { PedidoCTA } from "@/components/sections/PedidoCTA";
import { Contato } from "@/components/sections/Contato";

const e = pizzaria.endereco;
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: pizzaria.nome,
  servesCuisine: "Pizza",
  sameAs: [pizzaria.instagram.url],
  ...(e && { address: { "@type": "PostalAddress", streetAddress: e.rua, addressLocality: e.cidade, addressRegion: e.uf, postalCode: e.cep, addressCountry: "BR" } }),
  ...(pizzaria.whatsapp && { telephone: `+${pizzaria.whatsapp}` }),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: seo("Pizzaria O Brabo — Pizza artesanal no forno a lenha", "Pizza artesanal, massa de longa fermentação e forno a lenha. No fogo, a gente faz história. Bora pedir? 🍕"),
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: () => (<><Hero /><Essencia /><Cardapio /><Diferenciais /><Galeria /><PedidoCTA /><Contato /></>),
});
