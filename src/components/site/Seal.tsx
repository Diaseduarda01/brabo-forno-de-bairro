import logo from "@/assets/logo-obrabo.png";
/** Selo circular artesanal com texto em arco girando em volta da logo (a logo fica parada). */
export function Seal({ text = "FORNO A LENHA • FEITA COM CARINHO • ", className = "" }: { text?: string; className?: string }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs><path id="sealpath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1" />
        {/* textLength = circunferência do arco (2π·78 ≈ 490): o texto fecha o círculo sem sobrepor, com qualquer fonte. */}
        <text fill="currentColor" fontSize="14" fontFamily="Cinzel, serif">
          <textPath href="#sealpath" textLength="488" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      {/* A logo já tem anel próprio: ocupa o lugar do antigo círculo tracejado (r=62 → 62% do selo). */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img src={logo} alt="" width={192} height={192} className="h-[60%] w-[60%] object-contain" />
      </div>
    </div>
  );
}
