import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Essencia } from "@/components/sections/Essencia";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { PedidoCTA } from "@/components/sections/PedidoCTA";
export const Route = createFileRoute("/historia")({
  head: () => ({ meta: seo("Nossa História — Pizzaria O Brabo", "Mais que pizza, é nosso jeito de receber. Conheça a essência artesanal da Pizzaria O Brabo.") }),
  component: () => (<><Essencia asPage /><Diferenciais /><PedidoCTA /></>),
});
