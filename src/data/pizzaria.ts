/**
 * Fonte única de dados da Pizzaria O Brabo.
 * Substitua os campos `null` pelos dados oficiais — o site se adapta sozinho.
 */
// Fotos reais do Instagram da pizzaria (originais em ../assets/instagram/). Pedir autorização antes de publicar.
// Hero: imagem ilustrativa, não é da pizzaria (escolha da Duda). As demais são fotos reais.
import heroPizza from "@/assets/hero-pizza.jpg";
import fatiaQueijo from "@/assets/fatia-queijo.jpg";
import fatiaQueijoVertical from "@/assets/fatia-queijo-vertical.jpg";
import massaPizzaiolo from "@/assets/massa-pizzaiolo.jpg";
import massaEsticada from "@/assets/massa-esticada.jpg";
import bordaTostada from "@/assets/borda-tostada.jpg";
import fornoSalao from "@/assets/forno-salao.jpg";
// 4:5 do original brabo-59 (a versão quadrada cortava os fios de queijo no celular).
import fatiaAzeitona from "@/assets/fatia-azeitona-vertical.jpg";
import pizzaDoce from "@/assets/pizza-doce.jpg";
import massasFermentando from "@/assets/massas-fermentando.jpg";
import entradinhas from "@/assets/entradinhas.jpg";
// Sabores: recortes de 580x290 do post "mais pedidos" (brabo-34), sem a faixa com o nome.
import catubresa from "@/assets/sabor-catubresa.jpg";
import frangoCatupiry from "@/assets/sabor-frango-catupiry.jpg";
import carneSeca from "@/assets/sabor-carne-seca.jpg";
import merengue from "@/assets/sabor-merengue.jpg";
import camarao from "@/assets/sabor-camarao.jpg";
import modaDaCasa from "@/assets/sabor-moda-da-casa.jpg";

export const pizzaria = {
  nome: "Pizzaria O Brabo",
  nomeCurto: "O Brabo",
  slogan: "No fogo, a gente faz história.",
  instagram: { handle: "@pizzariaobrabo", url: "https://www.instagram.com/pizzariaobrabo/" },
  /** Número com DDI+DDD, só dígitos. Ex.: "5511999999999". */
  // Fonte dos dados abaixo: bio e posts do Instagram (consultados em 15/11/2026).
  whatsapp: "5511966931589" as string | null,
  /** Telefone fixo, como aparece na bio. */
  telefone: "(11) 2359-2744" as string | null,
  /** Link oficial de pedidos (iFood, cardápio digital...). Prioridade sobre WhatsApp. */
  linkPedidos: "https://pedido.anota.ai/loja/pizzaria-o-brabo" as string | null,
  /** CEP ainda não informado: null até confirmar. O Google Maps mostra "Jardim Casablanca, 05842-010": confirmar com o dono. */
  endereco: { rua: "R. Alaor Bronzone, 87", bairro: "Jardim São Luiz", cidade: "São Paulo", uf: "SP", cep: null } as null | {
    rua: string;
    bairro: string | null;
    cidade: string | null;
    uf: string | null;
    cep: string | null;
  },
  /** Ex.: [{ dias: "Ter a Dom", horas: "18h às 23h" }] */
  horarios: [
    { dias: "Ter a Qui", horas: "18h à meia-noite" },
    { dias: "Sex e Sáb", horas: "18h à 1h" },
    { dias: "Dom", horas: "18h à meia-noite" },
  ] as null | { dias: string; horas: string }[],
  /** Resumo curto para a faixa abaixo do hero. Derivado de `horarios`. */
  horarioResumo: "Ter a Dom, a partir das 18h" as string | null,
  /** Posts brabo-41 (raio) e brabo-42 (apps). Taxa ainda não informada. */
  entrega: { raioKm: 7, taxa: null as string | null, apps: ["iFood", "Keeta", "99", "Anota AI"] } as null | {
    raioKm: number;
    taxa: string | null;
    apps: string[];
  },
  /** Post brabo-18. */
  salao: { mesas: 4, lugares: 16 } as null | { mesas: number; lugares: number },
  /** "Desde 2024" na logo nova (brabo-02, brabo-49). */
  desde: 2024 as number | null,
};

export function whatsappUrl(msg = "Oi! Quero fazer um pedido") {
  return pizzaria.whatsapp ? `https://wa.me/${pizzaria.whatsapp}?text=${encodeURIComponent(msg)}` : null;
}

/** WhatsApp no formato de leitura: (11) 96693-1589. */
export function whatsappTexto() {
  const n = pizzaria.whatsapp?.replace(/^55/, "");
  return n && n.length === 11 ? `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}` : null;
}

export function telefoneUrl() {
  return pizzaria.telefone ? `tel:+55${pizzaria.telefone.replace(/\D/g, "")}` : null;
}

/** Canal de pedido: link oficial > WhatsApp > Instagram (canal oficial atual). */
export function pedidoUrl(msg?: string) {
  return pizzaria.linkPedidos ?? whatsappUrl(msg) ?? pizzaria.instagram.url;
}

export function enderecoTexto() {
  const e = pizzaria.endereco;
  if (!e) return null;
  const local = [e.bairro, e.cidade && e.uf ? `${e.cidade}/${e.uf}` : e.cidade].filter(Boolean).join(", ");
  return local ? `${e.rua} — ${local}` : e.rua;
}

export function mapsUrl() {
  const e = enderecoTexto();
  return e ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e)}` : null;
}

export type Pizza = { nome: string; descricao: string; preco: number | null; imagem: string; alt: string; destaque?: boolean };

/**
 * Cardápio parcial: sabores reais (post de "mais pedidos" no Instagram), sem descrição, tamanho nem preço.
 * `destaque` aparece na home; `/cardapio` mostra todos.
 * Trocar `cardapioDemo` para false quando o cardápio oficial completo chegar.
 */
export const cardapioDemo = true;
export const pizzas: Pizza[] = [
  { nome: "Catubresa", descricao: "", preco: null, imagem: catubresa, alt: "Catubresa de perto: catupiry em tiras, cebola e azeitona preta", destaque: true },
  { nome: "Frango catupiry", descricao: "", preco: null, imagem: frangoCatupiry, alt: "Frango catupiry de perto: frango desfiado, catupiry em tiras e azeitona", destaque: true },
  { nome: "Carne seca", descricao: "", preco: null, imagem: carneSeca, alt: "Carne seca de perto: carne desfiada com catupiry em treliça", destaque: true },
  { nome: "Merengue", descricao: "", preco: null, imagem: merengue, alt: "Pizza Merengue de perto, com cobertura branca esfarelada e pedaços vermelhos" },
  { nome: "Camarão", descricao: "", preco: null, imagem: camarao, alt: "Pizza de camarão com tomate picado, salsinha e azeitona" },
  { nome: "A moda da casa", descricao: "", preco: null, imagem: modaDaCasa, alt: "Pizza A moda da casa, queijo gratinado e azeitonas" },
];

/** Sabores confirmados nos posts, ainda sem foto própria. Descrição só quando o post traz os ingredientes. */
export const outrosSabores: { nome: string; descricao?: string }[] = [
  { nome: "Maria Bonita", descricao: "Carne seca, mussarela, tomate cereja e mussarela de búfala." },
  { nome: "Lá Parma" },
  { nome: "4 queijos" },
  { nome: "Borda recheada de Nutella" },
];

export const imagens = { heroPizza, massaPizzaiolo, fornoSalao, fatiaAzeitona, pizzaDoce, massasFermentando, entradinhas, massaEsticada, bordaTostada };

export type FotoGaleria = {
  src: string; alt: string; w: number; h: number; span: string;
  /** Versão vertical (4:5) para o carrossel e o modal do celular, quando a original é horizontal. */
  mobile?: { src: string; w: number; h: number };
};

export const galeria: FotoGaleria[] = [
  { src: fatiaQueijo, alt: "Fatia na mão, queijo puxando e borda tostada", w: 1920, h: 1080, span: "md:col-span-4 md:row-span-2", mobile: { src: fatiaQueijoVertical, w: 1024, h: 1280 } },
  { src: massaEsticada, alt: "Braço tatuado esticando a massa, potes de massa fermentando ao fundo", w: 1024, h: 1366, span: "md:col-span-2 md:row-span-2" },
  { src: bordaTostada, alt: "Fatia erguida mostrando a massa aerada por dentro da borda", w: 1024, h: 1365, span: "md:col-span-2" },
  { src: pizzaDoce, alt: "Pizza doce de morango com chocolate", w: 1024, h: 1024, span: "md:col-span-2" },
  { src: fornoSalao, alt: "Salão com o forno de tijolinho ao fundo", w: 832, h: 624, span: "md:col-span-2" },
  { src: massasFermentando, alt: "Potes de massa crescendo durante as 24 horas de fermentação", w: 1280, h: 960, span: "md:col-span-3" },
  { src: entradinhas, alt: "Entradinhas assadas servidas na tábua", w: 1024, h: 1280, span: "md:col-span-3" },
];

/**
 * Avaliações reais de clientes (SPEC-06). NUNCA inventar: só texto copiado de uma avaliação pública
 * (Google, iFood, Instagram) ou enviada pelo cliente, com autorização para publicar.
 * Vazio: a seção não aparece no site (em desenvolvimento, mostra cards de exemplo marcados como tal).
 */
export type Avaliacao = { nome: string; texto: string; nota: 1 | 2 | 3 | 4 | 5; fonte?: string; link?: string };
export const avaliacoes: Avaliacao[] = [];

/**
 * Perguntas frequentes (SPEC-15). As respostas são montadas a partir dos dados acima:
 * mudou o horário ou a entrega, o FAQ acompanha. Pergunta sem dado não aparece.
 */
export type Pergunta = { pergunta: string; resposta: string };
const lista = (itens: string[]) => new Intl.ListFormat("pt-BR", { type: "conjunction" }).format(itens);

export function perguntasFrequentes(): Pergunta[] {
  const p = pizzaria;
  const apps = p.entrega?.apps.filter((a) => a !== "Anota AI") ?? [];
  const canais = [p.linkPedidos && "pelo nosso app de pedidos", p.whatsapp && "pelo WhatsApp", apps.length && `pelos apps ${lista(apps)}`].filter(Boolean) as string[];
  const ou = (itens: string[]) => new Intl.ListFormat("pt-BR", { type: "disjunction" }).format(itens);
  const temNutella = outrosSabores.some((s) => /nutella/i.test(s.nome));
  const itens: (Pergunta | null)[] = [
    canais.length ? { pergunta: "Como faço meu pedido?", resposta: `Você pode pedir ${ou(canais)}. É só tocar em "Pedir" em qualquer parte do site.` } : null,
    p.entrega ? { pergunta: "Vocês entregam no meu bairro?", resposta: `A gente entrega num raio de até ${p.entrega.raioKm} km da pizzaria${p.endereco ? `, na ${p.endereco.rua}` : ""}. ${p.entrega.taxa ? `A taxa é ${p.entrega.taxa}.` : "Pra saber a taxa do seu endereço, é só colocar o CEP no app ou chamar a gente no WhatsApp."}` } : null,
    p.horarios?.length ? { pergunta: "Qual o horário de funcionamento?", resposta: `${p.horarios.map((h) => `${h.dias}: ${h.horas}`).join(". ")}.` } : null,
    p.salao ? { pergunta: "Dá pra comer aí na pizzaria?", resposta: `Dá sim. O salão tem ${p.salao.mesas} mesas, ${p.salao.lugares} lugares e o forno a lenha à vista. Se preferir, também dá pra retirar no balcão.` } : null,
    { pergunta: "O que é a massa de fermentação de 24h?", resposta: "A massa descansa 24 horas nos potes antes de ser aberta. Esse tempo deixa a pizza mais leve e a borda bem aerada." },
    { pergunta: "Tem promoção?", resposta: `Toda terça tem a Terça Maluca, com sabores em promoção. Os sabores e valores da semana saem no nosso Instagram (${p.instagram.handle}).` },
    { pergunta: "Tem pizza doce?", resposta: `Tem, como a de morango com chocolate${temNutella ? ", e também borda recheada de Nutella" : ""}. Os sabores do dia aparecem no cardápio do app.` },
  ];
  return itens.filter(Boolean) as Pergunta[];
}

export const navLinks = [
  { to: "/", label: "Início" },
  { to: "/historia", label: "Nossa História" },
  { to: "/cardapio", label: "Cardápio" },
  { to: "/galeria", label: "Galeria" },
  { to: "/contato", label: "Contato" },
] as const;
