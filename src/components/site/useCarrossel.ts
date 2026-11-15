import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Carrossel com `scroll-snap` nativo: passa sozinho devagar e a pessoa pode arrastar quando quiser.
 * Para fora da tela, com a aba oculta, depois de um toque (por `pausaAposToque` ms) e com `prefers-reduced-motion`.
 * O trilho (`ref`) precisa ter os slides como filhos diretos e `gap` igual a `gapPx`.
 */
export function useCarrossel(total: number, { intervalo = 6000, pausaAposToque = 12000, gapPx = 16 } = {}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atual, setAtual] = useState(0);
  const [visivel, setVisivel] = useState(false);
  const [pausado, setPausado] = useState(false);
  const ultimoToque = useRef(0);

  const passo = () => {
    const slide = ref.current?.firstElementChild as HTMLElement | null;
    return slide ? slide.offsetWidth + gapPx : 1;
  };
  /** Último índice que ainda consegue encostar no início do trilho (com 3 cards por vez, não é o último card). */
  const ultimo = () => {
    const el = ref.current;
    return el ? Math.min(total - 1, Math.round((el.scrollWidth - el.clientWidth) / passo())) : total - 1;
  };

  const irPara = useCallback((i: number) => {
    ref.current?.scrollTo({ left: i * passo(), behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tocou = useCallback(() => { ultimoToque.current = Date.now(); }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const f = () => setAtual(Math.min(total - 1, Math.round(el.scrollLeft / passo())));
    el.addEventListener("scroll", f, { passive: true });
    const io = new IntersectionObserver(([e]) => setVisivel(e?.isIntersecting ?? false), { threshold: 0.4 });
    io.observe(el);
    return () => { el.removeEventListener("scroll", f); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  useEffect(() => {
    if (total < 2 || pausado || !visivel || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      if (document.hidden || Date.now() - ultimoToque.current < pausaAposToque) return;
      irPara(atual >= ultimo() ? 0 : atual + 1);
    }, intervalo);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [atual, pausado, visivel, total, intervalo, pausaAposToque, irPara]);

  const eventos = {
    onTouchStart: tocou,
    onPointerDown: tocou,
    onWheel: tocou,
    onMouseEnter: () => setPausado(true),
    onMouseLeave: () => setPausado(false),
    onFocus: () => setPausado(true),
    onBlur: () => setPausado(false),
  };

  return { ref, atual, irPara, tocou, eventos, ultimo };
}
