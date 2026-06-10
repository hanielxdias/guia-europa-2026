import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { DocumentCategorySection } from "../components/DocumentCategorySection";
import { EmptyState } from "../components/EmptyState";
import { FilterBar } from "../components/FilterBar";
import { PageHeader } from "../components/PageHeader";
import { SearchInput } from "../components/SearchInput";
import { cities, documentItems, vouchers } from "../data";
import type { DocumentItem } from "../types/trip";
import { formatDate } from "../utils/dates";
import { normalizeSearch } from "../utils/filters";

const passagensTitles = [
  "Passagem Italo Roma → Florença",
  "Passagem Vueling Florença → Barcelona",
  "Passagem EasyJet Barcelona → Basel",
  "Passagem EasyJet Basel → Barcelona",
];

const hotelTitles = ["Reserva Hotel Leonardo da Vinci"];

const pendingTitles = [
  "Air Europa ida",
  "Air Europa volta",
  "Reserva Hotel Florença",
];

function byTitle(title: string) {
  return documentItems.find((item) => item.title === title);
}

function isDocumentItem(item: DocumentItem | undefined): item is DocumentItem {
  return Boolean(item);
}

const passagens: DocumentItem[] = passagensTitles
  .map(byTitle)
  .filter(isDocumentItem)
  .map((item) => ({
    ...item,
    category: "Passagens",
    details: [
      "Arquivo real ainda pode ser adicionado em public/documents.",
      "Use este card para centralizar passagem, bilhete ou comprovante.",
    ],
  }));

const hospedagens: DocumentItem[] = hotelTitles
  .map(byTitle)
  .filter(isDocumentItem)
  .map((item) => ({
    ...item,
    category: "Hospedagens",
    details: [
      "Reserva de hospedagem da etapa correspondente.",
      "Dados sensíveis não são exibidos na interface.",
    ],
  }));

const passeios: DocumentItem[] = vouchers.map((voucher) => ({
  id: `doc-${voucher.id}`,
  title: voucher.title,
  category: "Passeios e ingressos",
  city: voucher.city,
  date: voucher.date,
  status: voucher.status,
  filePath: voucher.documentPath,
  details: [
    voucher.time ? `Horário: ${voucher.time}` : "Horário a confirmar",
    voucher.type ? `Tipo: ${voucher.type}` : "",
    voucher.meetingPoint ? `Ponto de encontro: ${voucher.meetingPoint}` : "",
    voucher.address ? `Endereço: ${voucher.address}` : "",
    voucher.reservation ? `Reserva: ${voucher.reservation}` : "",
    ...(voucher.observations ?? []),
  ].filter(Boolean),
}));

const pendentes: DocumentItem[] = pendingTitles
  .map(byTitle)
  .filter(isDocumentItem)
  .map((item) => ({
    ...item,
    category: "Reservas pendentes",
    details: [
      "Status: aguardando arquivo ou detalhes complementares.",
      "Quando o documento real estiver disponível, atualize o caminho em src/data/trip.ts.",
    ],
  }));

const sections = [
  {
    title: "Passagens",
    description: "Bilhetes e comprovantes de deslocamentos já organizados.",
    documents: passagens,
  },
  {
    title: "Hospedagens",
    description: "Reservas de hotéis e bases da família durante a viagem.",
    documents: hospedagens,
  },
  {
    title: "Passeios e ingressos",
    description:
      "Vouchers integrados à área de documentos, com horários e observações importantes.",
    documents: passeios,
  },
  {
    title: "Reservas pendentes",
    description: "Arquivos ou detalhes que ainda precisam ser adicionados.",
    documents: pendentes,
  },
];

export function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("Todas");

  const filteredSections = useMemo(() => {
    const query = normalizeSearch(search);
    const selectedCity = normalizeSearch(city);

    return sections
      .map((section) => ({
        ...section,
        documents: section.documents.filter((document) => {
          const cityMatches =
            city === "Todas" ||
            normalizeSearch(document.city ?? "").includes(selectedCity);
          const searchable = normalizeSearch(
            [
              section.title,
              document.title,
              document.category,
              document.city,
              document.date ? formatDate(document.date) : "",
              document.status,
              ...(document.details ?? []),
            ]
              .filter(Boolean)
              .join(" "),
          );

          return cityMatches && (!query || searchable.includes(query));
        }),
      }))
      .filter((section) => section.documents.length > 0);
  }, [city, search]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.28 }}
    >
      <PageHeader
        eyebrow="Documentos"
        title="Arquivos importantes"
        description="Passagens, hospedagens, passeios e reservas pendentes reunidos em uma única área, sem dados sensíveis."
      />

      <div className="mb-7 grid gap-3">
        <SearchInput value={search} onChange={setSearch} />
        <FilterBar
          cities={cities.map((item) => item.name)}
          selectedCity={city}
          onCityChange={setCity}
        />
      </div>

      {filteredSections.length ? (
        <div className="grid gap-9">
          {filteredSections.map((section) => (
            <DocumentCategorySection
              description={section.description}
              documents={section.documents}
              key={section.title}
              title={section.title}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum documento encontrado"
          message="Busque por passagem, reserva, passeio, cidade ou status."
        />
      )}
    </motion.div>
  );
}
