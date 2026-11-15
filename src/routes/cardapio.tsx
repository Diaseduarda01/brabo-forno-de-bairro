import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Cardapio } from "@/components/sections/Cardapio";
import { PedidoCTA } from "@/components/sections/PedidoCTA";
export const Route = createFileRoute("/cardapio")({
  head: () => ({ meta: seo("Cardápio — As brabas da casa | Pizzaria O Brabo", "Pizzas artesanais assadas no forno a lenha. Escolha a sua e bora pedir!") }),
  component: () => (<><Cardapio asPage /><PedidoCTA /></>),
});
