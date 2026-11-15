import type { ReactNode } from "react";
export function SectionTitle({ eyebrow, title, children, align = "left", as: H = "h2" }: { eyebrow?: string; title: string; children?: ReactNode; align?: "left" | "center"; as?: "h1" | "h2" }) {
  const c = align === "center";
  return (
    <header className={`reveal ${c ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className={`eyebrow flex items-center gap-4 ${c ? "justify-center" : ""}`}><span className="h-px w-10 bg-brick" />{eyebrow}{c && <span className="h-px w-10 bg-brick" />}</p>}
      <H className="title-display mt-5 text-4xl sm:text-5xl lg:text-6xl">{title}</H>
      {children && <div className="mt-6 text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </header>
  );
}
