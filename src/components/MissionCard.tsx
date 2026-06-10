import { CheckCircle2, NotebookPen, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import type { Mission } from "../types/trip";
import { formatDateWithWeekday } from "../utils/dates";
import { cn } from "../utils/cn";

interface MissionCardProps {
  mission: Mission;
}

interface MissionState {
  checked: Record<string, boolean>;
  bestMoment: string;
  note: string;
}

function loadMissionState(id: string): MissionState {
  if (typeof window === "undefined") {
    return { checked: {}, bestMoment: "", note: "" };
  }

  try {
    const stored = window.localStorage.getItem(`mission:${id}`);
    return stored
      ? (JSON.parse(stored) as MissionState)
      : { checked: {}, bestMoment: "", note: "" };
  } catch {
    return { checked: {}, bestMoment: "", note: "" };
  }
}

export function MissionCard({ mission }: MissionCardProps) {
  const [state, setState] = useState<MissionState>(() =>
    loadMissionState(mission.id),
  );
  const { date, weekday } = formatDateWithWeekday(mission.date);
  const doneCount = mission.tasks.filter((task) => state.checked[task]).length;

  useEffect(() => {
    window.localStorage.setItem(`mission:${mission.id}`, JSON.stringify(state));
  }, [mission.id, state]);

  return (
    <article className="rounded-[1.75rem] border border-gold/20 bg-paper p-5 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
            {weekday} • {date}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{mission.title}</h3>
          <p className="mt-1 text-sm font-bold text-muted">{mission.city}</p>
        </div>
        <div className="rounded-full bg-leaf/10 px-4 py-2 text-sm font-semibold text-leaf ring-1 ring-leaf/15">
          {doneCount}/{mission.tasks.length}
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {mission.tasks.map((task) => (
          <label
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-2xl border p-3 transition",
              state.checked[task]
                ? "border-leaf/30 bg-leaf/10 text-leaf"
                : "border-[#E8DDC9] bg-paper text-text hover:bg-[#F6F1E7]",
            )}
            key={task}
          >
            <input
              checked={Boolean(state.checked[task])}
              className="sr-only"
              onChange={() =>
                setState((current) => ({
                  ...current,
                  checked: {
                    ...current.checked,
                    [task]: !current.checked[task],
                  },
                }))
              }
              type="checkbox"
            />
            <CheckCircle2 size={20} />
            <span className="text-sm font-bold">{task}</span>
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-3">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <Sparkles size={15} />
            Melhor momento do dia
          </span>
          <input
            className="min-h-12 w-full rounded-[1.1rem] border border-gold/25 bg-paper px-4 text-sm font-semibold text-text outline-none focus:border-gold focus:ring-4 focus:ring-gold/15"
            value={state.bestMoment}
            onChange={(event) =>
              setState((current) => ({
                ...current,
                bestMoment: event.target.value,
              }))
            }
            placeholder="Escreva aqui"
          />
        </label>
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <NotebookPen size={15} />
            Nota do dia
          </span>
          <textarea
            className="min-h-24 w-full resize-none rounded-[1.1rem] border border-gold/25 bg-paper px-4 py-3 text-sm font-semibold text-text outline-none focus:border-gold focus:ring-4 focus:ring-gold/15"
            value={state.note}
            onChange={(event) =>
              setState((current) => ({ ...current, note: event.target.value }))
            }
            placeholder="Uma memória rápida da viagem"
          />
        </label>
      </div>
    </article>
  );
}
