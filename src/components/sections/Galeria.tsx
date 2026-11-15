import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/site/Icon";
import { galeria } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";

/** Tempo de cada foto no carrossel do celular. */
const INTERVALO = 4500;
/** Depois que a pessoa mexe no carrossel, ele espera isso antes de voltar a passar sozinho. */
const PAUSA_APOS_TOQUE = 10000;

/**
 * Carrossel do celular (SPEC-11): passa sozinho devagar, a pessoa arrasta quando quiser
 * e o toque na foto abre o modal. Para quando sai da tela, quando o modal está aberto
 * e com `prefers-reduced-motion`.
 */
function Carrossel({ onAbrir, pausado }: { onAbrir: (i: number) => void; pausado: boolean }) {
  const trilho = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [visivel, setVisivel] = useState(false);
  const ultimoToque = useRef(0);

  const passo = () => {
    const el = trilho.current;
    const slide = el?.firstElementChild as HTMLElement | null;
    return slide ? slide.offsetWidth + 12 : 1; // 12 = gap-3
  };

  const irPara = useCallback((i: number) => {
    const el = trilho.current;
    if (!el) return;
    el.scrollTo({ left: i * passo(), behavior: "smooth" });
  }, []);

  // Foto atual a partir da rolagem (vale para o arraste e para o automático).
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const f = () => setAtual(Math.min(galeria.length - 1, Math.round(el.scrollLeft / passo())));
    el.addEventListener("scroll", f, { passive: true });
    return () => el.removeEventListener("scroll", f);
  }, []);

  // Só passa sozinho enquanto o carrossel está na tela.
  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e?.isIntersecting ?? false), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (pausado || !visivel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (document.hidden || Date.now() - ultimoToque.current < PAUSA_APOS_TOQUE) return;
      irPara((atual + 1) % galeria.length);
    }, INTERVALO);
    return () => window.clearInterval(t);
  }, [atual, pausado, visivel, irPara]);

  const tocou = () => { ultimoToque.current = Date.now(); };

  return (
    <div className="mt-12 md:hidden">
      <ul
        ref={trilho}
        onTouchStart={tocou}
        onPointerDown={tocou}
        onWheel={tocou}
        className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-roledescription="carrossel"
        aria-label="Fotos da pizzaria"
      >
        {galeria.map((g, i) => (
          <li key={g.alt} className="w-[82%] shrink-0 snap-start" aria-roledescription="slide" aria-label={`${i + 1} de ${galeria.length}`}>
            <button onClick={() => onAbrir(i)} className="block w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-gold" aria-label={`Ampliar: ${g.alt}`}>
              <img src={g.mobile?.src ?? g.src} alt={g.alt} width={g.mobile?.w ?? g.w} height={g.mobile?.h ?? g.h} loading={i < 2 ? "eager" : "lazy"} className="aspect-[4/5] w-full object-cover" />
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex items-center justify-center gap-2" role="group" aria-label="Escolher foto">
        {galeria.map((g, i) => (
          <button
            key={g.alt}
            onClick={() => { tocou(); irPara(i); }}
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === atual}
            className="flex h-6 items-center"
          >
            <span className={`block h-px transition-all duration-500 ${i === atual ? "w-8 bg-gold" : "w-4 bg-gold/35"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function Galeria({ asPage = false }: { asPage?: boolean }) {
  const [idx, setIdx] = useState<number | null>(null);
  const go = useCallback((d: number) => setIdx((i) => (i == null ? i : (i + d + galeria.length) % galeria.length)), []);
  const toqueX = useRef<number | null>(null);
  useEffect(() => {
    if (idx == null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [idx, go]);

  const aberta = idx != null ? galeria[idx] : undefined;

  return (
    <section id="galeria" className="bg-coal py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle as={asPage ? "h1" : "h2"} eyebrow="Galeria" title="Olha essa beleza.">De dar água na boca.</SectionTitle>
        <Carrossel onAbrir={setIdx} pausado={idx != null} />
        <ul className="mt-14 hidden auto-rows-[260px] grid-cols-6 gap-3 md:grid">
          {galeria.map((g, i) => (
            <li key={g.alt} className={`reveal ${g.span}`}>
              <button onClick={() => setIdx(i)} className="group relative block h-full w-full overflow-hidden focus-visible:outline-2 focus-visible:outline-gold" aria-label={`Ampliar: ${g.alt}`}>
                <img src={g.src} alt={g.alt} width={g.w} height={g.h} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 flex items-end bg-gradient-to-t from-coal/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-serif text-sm uppercase tracking-[0.2em] text-cream">{g.alt}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {idx != null && aberta && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={aberta.alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-coal/95 p-4 animate-rise"
          onClick={() => setIdx(null)}
          onTouchStart={(e) => { toqueX.current = e.touches[0]?.clientX ?? null; }}
          onTouchEnd={(e) => {
            const x0 = toqueX.current; const x1 = e.changedTouches[0]?.clientX;
            toqueX.current = null;
            if (x0 != null && x1 != null && Math.abs(x1 - x0) > 50) go(x1 < x0 ? 1 : -1);
          }}
        >
          <picture onClick={(e) => e.stopPropagation()}>
            {aberta.mobile && <source media="(max-width: 767px)" srcSet={aberta.mobile.src} />}
            <img src={aberta.src} alt={aberta.alt} className="max-h-[80vh] max-w-full object-contain" />
          </picture>
          <p className="absolute bottom-6 left-0 right-0 px-6 text-center font-serif text-sm uppercase tracking-[0.2em] text-cream">
            <span className="text-gold">{idx + 1} / {galeria.length}</span> · {aberta.alt}
          </p>
          <button className="absolute right-4 top-4 p-2 text-gold" onClick={() => setIdx(null)} aria-label="Fechar"><Icon name="close" className="h-8 w-8" /></button>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-coal/75 p-2 text-gold md:left-6 md:p-3" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior"><Icon name="chevron_left" className="h-7 w-7 md:h-9 md:w-9" /></button>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-gold/40 bg-coal/75 p-2 text-gold md:right-6 md:p-3" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próxima"><Icon name="chevron_right" className="h-7 w-7 md:h-9 md:w-9" /></button>
        </div>
      )}
    </section>
  );
}
