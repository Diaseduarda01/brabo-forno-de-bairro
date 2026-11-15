import logo from "@/assets/logo-obrabo.png";
import logoGrande from "@/assets/logo-obrabo-512.png";

/**
 * Logo da O Brabo extraída da foto da caixa de pizza (post brabo-49), com fundo transparente.
 * PROVISÓRIA: trocar pelo arquivo oficial (SVG/PNG) quando o dono mandar.
 */
export function Logo({ className = "h-16 w-16", grande = false }: { className?: string; grande?: boolean }) {
  return <img src={grande ? logoGrande : logo} alt="Pizzaria O Brabo" width={grande ? 480 : 192} height={grande ? 480 : 192} className={`object-contain ${className}`} />;
}
