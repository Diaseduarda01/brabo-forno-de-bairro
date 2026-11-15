import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes } from "react";

export const brandButton = cva(
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.18em] text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        fire: "bg-ember text-coal hover:bg-gold px-7 py-4 font-bold",
        gold: "bg-gold text-coal hover:bg-cream px-7 py-4 font-bold",
        outline: "border border-gold/70 text-gold hover:bg-gold hover:text-coal px-7 py-4",
        ghost: "text-cream hover:text-gold underline-offset-8 hover:underline px-0 py-2",
      },
      size: { sm: "!px-4 !py-2.5 text-sm", md: "" },
    },
    defaultVariants: { variant: "fire", size: "md" },
  },
);

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof brandButton>;
export function BrandLink({ className, variant, size, ...p }: Props) {
  const ext = p.href?.startsWith("http");
  return <a {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...p} className={cn(brandButton({ variant, size }), className)} />;
}
