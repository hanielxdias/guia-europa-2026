import { Compass, Plane, Stamp } from "lucide-react";
import { motion } from "framer-motion";
import { PremiumImagePlaceholder } from "./PremiumImagePlaceholder";

export function PremiumHero() {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[2rem] border border-gold/25 bg-paper shadow-editorial"
      initial={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35 }}
    >
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#102A43_1px,transparent_1px),linear-gradient(90deg,#102A43_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="relative grid gap-6 px-5 py-6 text-center md:px-8 md:py-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-12 lg:py-10 lg:text-left">
        <div>
          <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-gold/40 bg-[#F6F1E7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-navy lg:mx-0">
            <Stamp size={15} />
            2026
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-coral">
            Família Cotrim
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[0.98] tracking-normal text-ink md:text-6xl">
            Guia de Viagem em Família
          </h1>
          <p className="mt-3 font-display text-3xl font-semibold text-gold md:text-4xl">
            Europa 2026
          </p>
          <div className="mx-auto my-4 h-px max-w-sm bg-gradient-to-r from-transparent via-gold to-transparent lg:mx-0 lg:bg-gradient-to-r lg:from-gold lg:via-gold/45 lg:to-transparent" />
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">
            Família Cotrim • Roma • Florença • Barcelona • Basel
          </p>
          <p className="mt-3 text-sm font-medium text-muted md:text-base">
            15 de junho a 07 de julho de 2026
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted md:text-base lg:mx-0">
            Um roteiro familiar pela Itália, Espanha e Suíça, reunindo arte,
            história, cultura, descanso e momentos especiais.
          </p>

          <div className="mt-5 hidden flex-wrap justify-center gap-3 sm:flex lg:justify-start">
            {[
              ["Arte", Compass],
              ["História", Stamp],
              ["Deslocamentos", Plane],
            ].map(([label, Icon]) => {
              const LucideIcon = Icon as typeof Compass;
              return (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-[#F6F1E7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-navy"
                  key={label as string}
                >
                  <LucideIcon size={15} />
                  {label as string}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <div className="mx-auto max-w-[460px] rounded-[2rem] border border-gold/30 bg-[#F6F1E7] p-3 shadow-editorial lg:max-w-[520px]">
            <PremiumImagePlaceholder
              className="aspect-[3/1] rounded-[1.5rem] sm:aspect-[16/10] lg:aspect-[4/3]"
              image="/images/hero-europa-2026.png"
              name="Europa 2026"
              priority
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
