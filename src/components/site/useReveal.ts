import { useEffect } from "react";
/**
 * Animação sutil de entrada para elementos com a classe `.reveal`.
 * Um MutationObserver registra todo `.reveal` que entra no DOM (troca de rota, conteúdo carregado depois),
 * então nenhum elemento fica preso apagado em .35 por ter sido montado depois do efeito.
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px 15% 0px" },
    );
    const registrar = (raiz: ParentNode) => {
      if (raiz instanceof Element && raiz.matches(".reveal:not(.is-in)")) io.observe(raiz);
      raiz.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));
    };
    registrar(document);
    const mo = new MutationObserver((ms) => ms.forEach((m) => m.addedNodes.forEach((n) => { if (n instanceof Element) registrar(n); })));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); io.disconnect(); };
  }, []);
}
