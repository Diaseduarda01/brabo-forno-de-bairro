import { Flame } from "lucide-react";
/** Selo circular artesanal com texto em arco. */
export function Seal({ text = "FORNO A LENHA • FEITA COM CARINHO • ", className = "" }: { text?: string; className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs><path id="sealpath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" />
        <text fill="currentColor" fontSize="15" letterSpacing="3.2" fontFamily="Cinzel, serif">
          <textPath href="#sealpath">{text.repeat(2)}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Flame className="h-8 w-8 text-ember animate-flicker" strokeWidth={1.25} />
        <span className="mt-1 font-display text-xs tracking-[0.25em]">O BRABO</span>
      </div>
    </div>
  );
}
