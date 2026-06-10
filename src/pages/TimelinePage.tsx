import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { TimelineItem } from "../components/TimelineItem";
import { cities, tripDays } from "../data";
import type { EventType } from "../types/trip";
import { normalizeSearch } from "../utils/filters";

export function TimelinePage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");
  const [type, setType] = useState<EventType | "todos">("todos");

  const filteredDays = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return tripDays.filter((day) => {
      const cityMatches =
        city === "Todas" || normalizeSearch(day.city).includes(selectedCity);
      const typeMatches = type === "todos" || day.eventType === type;
      const searchable = normalizeSearch(
        [
          day.title,
          day.city,
          day.description,
          day.route,
          ...day.activities,
          ...(day.importantInfo ?? []),
          ...(day.numberedRoute ?? []),
        ]
          .filter(Boolean)
          .join(" "),
      );

      return cityMatches && typeMatches && (!query || searchable.includes(query));
    });
  }, [city, search, type]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PageHeader
        eyebrow="Linha do tempo"
        title="Todos os dias da viagem"
        description="Visão geral de 15/06 a 07/07, com filtros por cidade, tipo de evento e busca por nome."
      />

      <div className="mb-5 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
          selectedType={type}
          onTypeChange={setType}
        />
      </div>

      {filteredDays.length ? (
        <div className="grid gap-5">
          {filteredDays.map((day) => (
            <TimelineItem day={day} key={day.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum dia encontrado"
          message="Ajuste os filtros ou a busca para ver outros eventos da viagem."
        />
      )}
    </motion.div>
  );
}
