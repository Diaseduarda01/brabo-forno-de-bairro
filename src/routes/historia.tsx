import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { pizzaria } from "@/data/pizzaria";
import { Essencia } from "@/components/sections/Essencia";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { PedidoCTA } from "@/components/sections/PedidoCTA";
export const Route = createFileRoute("/historia")({
  head: () => ({ meta: seo("Nossa História — Pizzaria O Brabo", `Massa de 24h, forno a lenha e a casa nova${pizzaria.endereco ? ` na ${pizzaria.endereco.rua.replace(/^R\. /, "")}` : ""}. A história da Pizzaria O Brabo.`) }),
  component: () => (<><Essencia asPage /><Diferenciais /><PedidoCTA /></>),
});
