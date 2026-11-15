import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galeria } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";

export function Galeria({ asPage = false }: { asPage?: boolean }) {
  const [idx, setIdx] = useState<number | null>(null);
  const go = useCallback((d: number) => setIdx((i) => (i == null ? i : (i + d + galeria.length) % galeria.length)), []);
  useEffect(() => {
    if (idx == null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setIdx(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [idx, go]);

  return (
    <section id="galeria" className="bg-coal py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle as={asPage ? "h1" : "h2"} eyebrow="Galeria" title="Olha essa beleza.">De dar água na boca 🔥</SectionTitle>
        <ul className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-2 sm:auto-rows-[260px] md:grid-cols-6 md:gap-3">
          {galeria.map((g, i) => (
            <li key={g.alt} className={`reveal ${i === 0 ? "col-span-2" : ""} ${g.span}`}>
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
      {idx != null && (
        <div role="dialog" aria-modal="true" aria-label={galeria[idx].alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-coal/95 p-4 animate-rise" onClick={() => setIdx(null)}>
          <img src={galeria[idx].src} alt={galeria[idx].alt} className="max-h-[85vh] max-w-full object-contain" onClick={(e) => e.stopPropagation()} />
          <p className="absolute bottom-6 left-0 right-0 text-center font-serif uppercase tracking-[0.2em] text-cream">{galeria[idx].alt}</p>
          <button className="absolute right-4 top-4 p-2 text-gold" onClick={() => setIdx(null)} aria-label="Fechar"><X className="h-8 w-8" strokeWidth={1.25} /></button>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-gold" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Anterior"><ChevronLeft className="h-10 w-10" strokeWidth={1} /></button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-gold" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Próxima"><ChevronRight className="h-10 w-10" strokeWidth={1} /></button>
        </div>
      )}
    </section>
  );
}
