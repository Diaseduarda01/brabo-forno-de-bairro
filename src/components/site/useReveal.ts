import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
/** Animação sutil de entrada para elementos com a classe `.reveal`. */
export function useReveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
}
