import { avaliacoes, type Avaliacao } from "@/data/pizzaria";
import { Icon } from "@/components/site/Icon";
import { SectionTitle } from "@/components/site/SectionTitle";
import { useCarrossel } from "@/components/site/useCarrossel";

/** Só em desenvolvimento, para ver o layout enquanto não há avaliações reais. Nunca vai para o site publicado. */
const EXEMPLOS: Avaliacao[] = [1, 2, 3, 4].map(() => ({
  nome: "Nome do cliente",
  texto: "Exemplo: aqui entra o texto de uma avaliação real, copiado do Google, do iFood ou do Instagram, com autorização para publicar.",
  nota: 5,
  fonte: "Google",
}));

function Estrelas({ nota }: { nota: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${nota} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={`h-5 w-5 ${i <= nota ? "text-gold" : "text-gold/25"}`} aria-hidden>
          <path fill="currentColor" d="M12 2.5l2.9 6.2 6.6.7-4.9 4.5 1.4 6.6L12 17.2l-5.9 3.3 1.4-6.6-4.9-4.5 6.6-.7z" />
        </svg>
      ))}
    </div>
  );
}

/** SPEC-06: prova social. Sem avaliações reais, a seção não aparece no site publicado. */
export function Avaliacoes() {
  const exemplo = avaliacoes.length === 0;
  const lista = exemplo ? (import.meta.env.DEV ? EXEMPLOS : []) : avaliacoes;
  const { ref, atual, irPara, tocou, eventos, ultimo } = useCarrossel(lista.length);
  if (lista.length === 0) return null;

  const media = lista.reduce((s, a) => s + a.nota, 0) / lista.length;

  return (
    <section id="avaliacoes" className="texture-coal overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Avaliações" title="Palavra de quem já pediu." />
          {!exemplo && (
            <div className="reveal flex items-center gap-3">
              <Estrelas nota={Math.round(media)} />
              <span className="font-serif text-lg text-cream">{media.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} de 5</span>
            </div>
          )}
        </div>

        {exemplo && (
          <p className="mt-6 inline-block border border-ember/60 px-3 py-1 font-serif text-sm uppercase tracking-[0.15em] text-ember">
            Exemplo · só aparece em desenvolvimento até entrarem avaliações reais
          </p>
        )}

        <div className="relative mt-12">
          <ul
            ref={ref}
            {...eventos}
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
            aria-roledescription="carrossel"
            aria-label="Avaliações de clientes"
          >
            {lista.map((a, i) => (
              <li key={`${a.nome}-${i}`} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]" aria-roledescription="slide" aria-label={`${i + 1} de ${lista.length}`}>
                <figure className="flex h-full flex-col border border-gold/25 bg-coal-soft p-7">
                  <Estrelas nota={a.nota} />
                  <blockquote className="mt-5 flex-1 font-serif text-xl italic leading-relaxed text-cream">“{a.texto}”</blockquote>
                  <figcaption className="mt-6 border-t border-gold/20 pt-4">
                    <span className="block font-display text-sm uppercase tracking-[0.12em] text-gold">{a.nome}</span>
                    {a.fonte && (
                      a.link
                        ? <a href={a.link} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground underline-offset-4 hover:underline">Avaliação no {a.fonte}</a>
                        : <span className="text-sm text-muted-foreground">Avaliação no {a.fonte}</span>
                    )}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          {lista.length > 1 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button onClick={() => { tocou(); irPara(Math.max(0, atual - 1)); }} disabled={atual === 0} aria-label="Avaliação anterior" className="hidden rounded-full border border-gold/40 p-2 text-gold transition-opacity disabled:opacity-30 md:block">
                <Icon name="chevron_left" className="h-6 w-6" />
              </button>
              <div className="flex items-center gap-2" role="group" aria-label="Escolher avaliação">
                {lista.map((a, i) => (
                  <button key={`${a.nome}-${i}`} onClick={() => { tocou(); irPara(i); }} aria-label={`Ver avaliação ${i + 1}`} aria-current={i === atual} className="flex h-6 items-center">
                    <span className={`block h-px transition-all duration-500 ${i === atual ? "w-8 bg-gold" : "w-4 bg-gold/35"}`} />
                  </button>
                ))}
              </div>
              <button onClick={() => { tocou(); irPara(Math.min(ultimo(), atual + 1)); }} disabled={atual >= ultimo()} aria-label="Próxima avaliação" className="hidden rounded-full border border-gold/40 p-2 text-gold transition-opacity disabled:opacity-30 md:block">
                <Icon name="chevron_right" className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
