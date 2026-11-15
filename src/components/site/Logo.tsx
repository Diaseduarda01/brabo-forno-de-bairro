import { Flame } from "lucide-react";
/** Representação tipográfica TEMPORÁRIA — substitua pelo arquivo da logo oficial. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="Pizzaria O Brabo">
      <Flame className="h-5 w-5 text-ember" strokeWidth={1.5} aria-hidden />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[0.6rem] uppercase tracking-[0.5em] text-cream/70">Pizzaria</span>
        <span className="font-display text-xl font-bold tracking-[0.12em] text-gold">O BRABO</span>
      </span>
    </span>
  );
}
