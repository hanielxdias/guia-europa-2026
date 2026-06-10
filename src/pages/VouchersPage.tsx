import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { VoucherCard } from "../components/VoucherCard";
import { cities, vouchers } from "../data";
import { normalizeSearch } from "../utils/filters";

export function VouchersPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");

  const filteredVouchers = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return vouchers.filter((voucher) => {
      const cityMatches =
        city === "Todas" || normalizeSearch(voucher.city).includes(selectedCity);
      const searchable = normalizeSearch(
        [
          voucher.title,
          voucher.city,
          voucher.type,
          voucher.meetingPoint,
          voucher.address,
          voucher.reservation,
          ...(voucher.observations ?? []),
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
        eyebrow="Vouchers"
        title="Ingressos e reservas"
        description="Passeios confirmados, horários de bilhetes, pontos de encontro e arquivos placeholder."
      />

      <div className="mb-5 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
      </div>

      {filteredVouchers.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredVouchers.map((voucher) => (
            <VoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum voucher encontrado"
          message="Busque por passeio, cidade, horário ou ponto de encontro."
        />
      )}
    </motion.div>
  );
}
