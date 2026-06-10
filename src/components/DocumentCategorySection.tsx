import type { DocumentItem } from "../types/trip";
import { DocumentCard } from "./DocumentCard";

interface DocumentCategorySectionProps {
  title: string;
  description: string;
  documents: DocumentItem[];
}

export function DocumentCategorySection({
  title,
  description,
  documents,
}: DocumentCategorySectionProps) {
  if (!documents.length) {
    return null;
  }

  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coral">
            Documentos
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            {description}
          </p>
        </div>
        <div className="hidden h-px flex-1 bg-gold/35 md:block" />
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => (
          <DocumentCard document={document} key={document.id} />
        ))}
      </div>
    </section>
  );
}
