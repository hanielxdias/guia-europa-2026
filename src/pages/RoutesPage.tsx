import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { RouteDayCard } from "../components/RouteDayCard";
import { SearchInput } from "../components/SearchInput";
import { cities, tripDays } from "../data";
import { normalizeSearch } from "../utils/filters";

interface RoutesPageProps {
  initialCity?: string;
}

export function RoutesPage({ initialCity }: RoutesPageProps) {
  const [city, setCity] = useState(initialCity ?? "Todas");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialCity) {
      setCity(initialCity);
    }
  }, [initialCity]);

  const filteredDays = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return tripDays.filter((day) => {
      const cityMatches =
        city === "Todas" || normalizeSearch(day.city).includes(selectedCity);
      const searchable = normalizeSearch(
        [
          day.title,
          day.city,
          day.period,
          day.description,
          day.route,
          day.summaryTitle,
          day.practicalSummary,
          ...day.activities,
          ...(day.importantInfo ?? []),
          ...(day.routeNotes ?? []),
          ...(day.foodSuggestions ?? []),
          ...(day.importantNotes ?? []),
          ...(day.numberedRoute ?? []),
          ...(day.suggestions?.map((suggestion) => suggestion.name) ?? []),
          ...(day.suggestions?.map((suggestion) => suggestion.description) ??
            []),
          ...(day.customMapLinks?.map((item) => item.title) ?? []),
          ...(day.customMapLinks?.map((item) => item.description) ?? []),
        ]
          .filter(Boolean)
          .join(" "),
      );

      return cityMatches && (!query || searchable.includes(query));
    });
  }, [city, search]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PageHeader
        eyebrow="Roteiros"
        title="Roteiro por dia"
        description="Consulta principal da viagem, com filtro por cidade, horários de bilhetes e mapas contextuais."
      />

      <div className="mb-6 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
      </div>

      {filteredDays.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredDays.map((day) => (
            <RouteDayCard day={day} key={day.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum roteiro encontrado"
          message="Ajuste a cidade ou o termo de busca para localizar outro dia."
        />
      )}
    </motion.div>
  );
}
