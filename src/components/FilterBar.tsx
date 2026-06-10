import type { EventType } from "../types/trip";
import { eventTypeLabels } from "../utils/filters";
import { cn } from "../utils/cn";

interface FilterBarProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedType?: EventType | "todos";
  onTypeChange?: (type: EventType | "todos") => void;
}

const eventTypes: Array<EventType | "todos"> = [
  "todos",
  "voo",
  "trem",
  "hospedagem",
  "passeio",
  "dia livre",
  "documento",
];

export function FilterBar({
  cities,
  selectedCity,
  onCityChange,
  selectedType = "todos",
  onTypeChange,
}: FilterBarProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[1.5rem] border border-gold/20 bg-paper p-3 shadow-soft">
      <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1">
        {["Todas", ...cities].map((city) => (
          <button
            className={cn(
              "min-h-10 shrink-0 rounded-full px-4 text-sm font-bold transition",
              selectedCity === city
                ? "bg-leaf text-paper shadow-soft"
                : "bg-[#F6F1E7] text-muted hover:bg-[#EFE5D3]",
            )}
            key={city}
            onClick={() => onCityChange(city)}
            type="button"
          >
            {city}
          </button>
        ))}
      </div>

      {onTypeChange ? (
        <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-1">
          {eventTypes.map((type) => (
            <button
              className={cn(
              "min-h-10 shrink-0 rounded-full px-4 text-sm font-bold transition",
              selectedType === type
                  ? "bg-gold text-paper shadow-soft"
                  : "bg-[#F6F1E7] text-muted hover:bg-[#EFE5D3]",
              )}
              key={type}
              onClick={() => onTypeChange(type)}
              type="button"
            >
              {type === "todos" ? "Todos os tipos" : eventTypeLabels[type]}
            </button>
          ))}
        </div>
      ) : null}
      </div>
    </div>
  );
}
