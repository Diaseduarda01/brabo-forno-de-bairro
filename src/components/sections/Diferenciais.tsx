import { Icon, type IconName } from "@/components/site/Icon";
import { imagens, pizzaria } from "@/data/pizzaria";
import { SectionTitle } from "@/components/site/SectionTitle";

const numero = (n: number) => ["zero", "uma", "duas", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"][n] ?? String(n);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// Cada item é um fato que dá pra conferir nos posts da pizzaria (24h: brabo-17; massa aberta: brabo-51; borda: brabo-53; salão: brabo-18).
const itens: { icon: IconName; t: string; d: string }[] = [
  { icon: "schedule", t: "24h de fermentação", d: "A massa descansa um dia inteiro nos potes antes de virar pizza. Por isso ela fica leve." },
  { icon: "front_hand", t: "Aberta na mão", d: "Cada bola de massa é aberta na bancada, uma de cada vez." },
  { icon: "local_fire_department", t: "Forno a lenha", d: "Lenha queimando a noite toda. A borda sai com aquelas pintinhas tostadas." },
  ...(pizzaria.salao
    ? [{ icon: "location_on" as IconName, t: "Salão de bairro", d: `${cap(numero(pizzaria.salao.mesas))} mesas, ${pizzaria.salao.lugares} lugares e o forno ali do lado.` }]
    : []),
];

export function Diferenciais() {
  return (
    <section className="relative isolate overflow-hidden py-24 lg:py-36">
      <img src={imagens.fornoSalao} alt="" width={832} height={624} loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-coal/80" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionTitle align="center" eyebrow="Nosso jeito" title="A massa espera 24h. O forno é a lenha." />
        <ol className="relative mt-16 grid grid-cols-2 gap-x-5 gap-y-12 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          <div className="absolute left-0 right-0 top-12 hidden gold-rule lg:block" aria-hidden />
          {itens.map(({ icon, t, d }, i) => (
            <li key={t} className={`reveal relative flex flex-col items-center text-center ${i % 2 ? "lg:mt-16" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-cream text-brick ring-1 ring-gold ring-offset-4 ring-offset-coal lg:h-24 lg:w-24">
                <Icon name={icon} className="h-7 w-7 lg:h-10 lg:w-10" />
              </span>
              <span className="mt-5 font-serif text-sm tracking-[0.3em] text-brick lg:mt-6">0{i + 1}</span>
              <h3 className="mt-2 font-display text-base uppercase text-gold sm:text-xl">{t}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-muted-foreground sm:text-base lg:mt-3">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
