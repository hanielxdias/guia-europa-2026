import { CalendarDays, Globe2, MapPinned, Sparkles, UsersRound } from "lucide-react";

const summary = [
  {
    label: "Período",
    value: "15/06/2026 a 07/07/2026",
    icon: CalendarDays,
  },
  {
    label: "Cidades",
    value: "Roma, Florença, Barcelona e Basel",
    icon: MapPinned,
  },
  {
    label: "Países",
    value: "Itália, Espanha e Suíça",
    icon: Globe2,
  },
  {
    label: "Perfil",
    value: "Viagem em família",
    icon: UsersRound,
  },
  {
    label: "Experiências",
    value:
      "História, arte, arquitetura, gastronomia, descanso e deslocamentos internacionais",
    icon: Sparkles,
  },
];

export function TripSummaryCard() {
  return (
    <section className="rounded-[1.75rem] border border-gold/20 bg-paper p-5 shadow-soft md:p-6">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">
            Resumo
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            A viagem em poucos sinais
          </h2>
        </div>
        <div className="hidden h-px flex-1 bg-gold/35 md:block" />
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="rounded-[1.25rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4"
              key={item.label}
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-leaf text-paper">
                <Icon size={18} />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-coral">
                {item.label}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-text">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
