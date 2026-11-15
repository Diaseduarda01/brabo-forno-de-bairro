/**
 * Fonte única de dados da Pizzaria O Brabo.
 * Substitua os campos `null` pelos dados oficiais — o site se adapta sozinho.
 */
import heroPizza from "@/assets/hero-pizza.jpg";
import dough from "@/assets/dough.jpg";
import pepperoni from "@/assets/pizza-pepperoni.jpg";
import queijos from "@/assets/pizza-queijos.jpg";
import oven from "@/assets/oven-fire.jpg";
import ingredients from "@/assets/ingredients.jpg";
import ambiente from "@/assets/ambiente.jpg";
import chef from "@/assets/chef.jpg";

export const pizzaria = {
  nome: "Pizzaria O Brabo",
  nomeCurto: "O Brabo",
  slogan: "No fogo, a gente faz história.",
  instagram: { handle: "@pizzariaobrabo", url: "https://www.instagram.com/pizzariaobrabo/" },
  /** Número com DDI+DDD, só dígitos. Ex.: "5511999999999". */
  whatsapp: null as string | null,
  /** Link oficial de pedidos (iFood, cardápio digital...). Prioridade sobre WhatsApp. */
  linkPedidos: null as string | null,
  endereco: null as null | { rua: string; bairro: string; cidade: string; uf: string; cep: string },
  /** Ex.: [{ dias: "Ter a Dom", horas: "18h às 23h" }] */
  horarios: null as null | { dias: string; horas: string }[],
};

export function whatsappUrl(msg = "Oi! Quero fazer um pedido 🍕") {
  return pizzaria.whatsapp ? `https://wa.me/${pizzaria.whatsapp}?text=${encodeURIComponent(msg)}` : null;
}

/** Canal de pedido: link oficial > WhatsApp > Instagram (canal oficial atual). */
export function pedidoUrl(msg?: string) {
  return pizzaria.linkPedidos ?? whatsappUrl(msg) ?? pizzaria.instagram.url;
}

export function enderecoTexto() {
  const e = pizzaria.endereco;
  return e ? `${e.rua} — ${e.bairro}, ${e.cidade}/${e.uf}` : null;
}

export type Pizza = { nome: string; descricao: string; preco: number | null; imagem: string; tag?: string };

/** DEMONSTRAÇÃO — substituir pelo cardápio oficial. */
export const cardapioDemo = true;
export const pizzas: Pizza[] = [
  { nome: "Margherita (exemplo)", descricao: "Molho de tomate, muçarela derretendo e manjericão fresquinho. Simples e BRABA.", preco: null, imagem: heroPizza, tag: "Clássica" },
  { nome: "Pepperoni (exemplo)", descricao: "Borda tostada no forno a lenha e pepperoni crocante. De dar água na boca.", preco: null, imagem: pepperoni, tag: "Favorita" },
  { nome: "Quatro Queijos (exemplo)", descricao: "Queijos cremosos, mel e nozes. Pra quem ama aquele puxa-puxa.", preco: null, imagem: queijos, tag: "Especial" },
];

export const imagens = { heroPizza, dough, oven, ingredients, ambiente, chef, pepperoni, queijos };

export const galeria = [
  { src: heroPizza, alt: "Pizza artesanal saindo do forno a lenha", w: 1920, h: 1088, span: "md:col-span-4 md:row-span-2" },
  { src: chef, alt: "Pizzaiolo colocando pizza no forno", w: 1024, h: 1280, span: "md:col-span-2 md:row-span-2" },
  { src: ingredients, alt: "Ingredientes frescos selecionados", w: 1280, h: 960, span: "md:col-span-2" },
  { src: queijos, alt: "Pizza de queijos com mel e nozes", w: 1024, h: 1024, span: "md:col-span-2" },
  { src: oven, alt: "Chamas do forno a lenha", w: 1280, h: 960, span: "md:col-span-2" },
  { src: ambiente, alt: "Ambiente acolhedor da pizzaria", w: 1280, h: 960, span: "md:col-span-3" },
  { src: dough, alt: "Massa sendo aberta à mão", w: 1024, h: 1280, span: "md:col-span-3" },
];

export const navLinks = [
  { to: "/", label: "Início" },
  { to: "/historia", label: "Nossa História" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;
