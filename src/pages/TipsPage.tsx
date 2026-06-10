import { motion } from "framer-motion";
import { CheckCircle2, Lightbulb } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { tips } from "../data";

export function TipsPage() {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PageHeader
        eyebrow="Dicas"
        title="Lembretes úteis"
        description="Cards rápidos para consultar antes de sair e durante a viagem."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {tips.map((section, index) => (
          <article
            className="rounded-[1.75rem] border border-gold/20 bg-paper p-5 shadow-soft"
            key={section.category}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full text-paper ${
                  index % 3 === 0
                    ? "bg-navy"
                    : index % 3 === 1
                      ? "bg-leaf"
                      : "bg-coral"
                }`}
              >
                <Lightbulb size={23} />
              </div>
              <h2 className="font-display text-2xl font-black text-ink">
                {section.category}
              </h2>
            </div>
            <div className="mt-5 grid gap-3">
              {section.items.map((item) => (
                <div
                  className="flex gap-3 rounded-[1.2rem] bg-[#F6F1E7] p-4 text-sm font-semibold leading-6 text-text"
                  key={item}
                >
                  <CheckCircle2 className="shrink-0 text-leaf" size={18} />
                  {item}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
