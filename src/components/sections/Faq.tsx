import { perguntasFrequentes, whatsappUrl } from "@/data/pizzaria";
import { Icon } from "@/components/site/Icon";
import { SectionTitle } from "@/components/site/SectionTitle";
import { BrandLink } from "@/components/site/BrandButton";

/** SPEC-15: perguntas frequentes no fim da página. Respostas montadas a partir de `pizzaria.ts`. */
export function Faq() {
  const perguntas = perguntasFrequentes();
  const wa = whatsappUrl("Oi! Tenho uma dúvida");
  if (perguntas.length === 0) return null;

  return (
    <section id="faq" className="texture-coal py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <SectionTitle eyebrow="Perguntas frequentes" title="Ficou alguma dúvida?" />
          {wa && (
            <div className="reveal mt-8">
              <p className="text-muted-foreground">Não achou o que procurava? Chama a gente.</p>
              <BrandLink href={wa} variant="outline" size="sm" className="mt-4"><Icon name="whatsapp" className="h-4 w-4" />Perguntar no WhatsApp</BrandLink>
            </div>
          )}
        </div>
        <div className="reveal lg:col-span-7 lg:col-start-6">
          {perguntas.map((q) => (
            <details key={q.pergunta} className="group border-b border-gold/20">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-xl font-semibold text-cream transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-gold [&::-webkit-details-marker]:hidden">
                {q.pergunta}
                <Icon name="chevron_right" className="h-6 w-6 shrink-0 text-gold transition-transform duration-300 group-open:rotate-90" />
              </summary>
              <p className="pb-6 pr-10 leading-relaxed text-muted-foreground">{q.resposta}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
