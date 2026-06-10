import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { MissionCard } from "../components/MissionCard";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { cities, missions } from "../data";
import { normalizeSearch } from "../utils/filters";

export function MissionsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");

  const filteredMissions = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return missions.filter((mission) => {
      const cityMatches =
        city === "Todas" || normalizeSearch(mission.city).includes(selectedCity);
      const searchable = normalizeSearch(
        [mission.title, mission.city, ...mission.tasks].join(" "),
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
        eyebrow="Missões do Dia"
        title="Checklist divertido da Família Cotrim"
        description="Marque missões, registre o melhor momento do dia e deixe uma nota rápida. O estado fica salvo no navegador."
      />

      <div className="mb-5 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
      </div>

      {filteredMissions.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {filteredMissions.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhuma missão encontrada"
          message="Altere o filtro de cidade ou a busca para ver outras missões."
        />
      )}
    </motion.div>
  );
}
