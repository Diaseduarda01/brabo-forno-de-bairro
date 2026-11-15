import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Galeria } from "@/components/sections/Galeria";
import { PedidoCTA } from "@/components/sections/PedidoCTA";
export const Route = createFileRoute("/galeria")({
  head: () => ({ meta: seo("Galeria — Olha essa beleza | Pizzaria O Brabo", "Fotos das nossas pizzas, do forno a lenha e dos bastidores da Pizzaria O Brabo.") }),
  component: () => (<><Galeria asPage /><PedidoCTA /></>),
});
