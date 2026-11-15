import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Contato } from "@/components/sections/Contato";
export const Route = createFileRoute("/contato")({
  head: () => ({ meta: seo("Contato e Localização — Pizzaria O Brabo", "Chega mais! Endereço, horários, WhatsApp e Instagram da Pizzaria O Brabo.") }),
  component: () => <Contato asPage />,
});
