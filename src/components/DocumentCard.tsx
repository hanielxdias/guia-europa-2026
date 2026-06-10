import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";
import { useState } from "react";
import type { DocumentItem } from "../types/trip";
import { cn } from "../utils/cn";
import { formatDate } from "../utils/dates";
import { StatusBadge } from "./StatusBadge";

interface DocumentCardProps {
  document: DocumentItem;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-[1.5rem] border border-gold/20 bg-paper p-5 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/35 bg-[#F6F1E7] text-navy">
          <FileText size={24} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                {document.category}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-ink">
                {document.title}
              </h3>
            </div>
            <StatusBadge status={document.status} />
          </div>
          <p className="mt-2 text-sm font-semibold text-muted">
            {document.city ?? "Viagem"}
            {document.date ? ` • ${formatDate(document.date)}` : ""}
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <a
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-leaf px-5 text-sm font-semibold text-paper transition hover:bg-ink"
              href={document.filePath}
              target="_blank"
              rel="noreferrer"
            >
              Ver arquivo
              <ExternalLink size={17} />
            </a>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#F6F1E7] px-5 text-sm font-semibold text-navy ring-1 ring-gold/25 transition hover:bg-[#FFF9EE]"
              onClick={() => setExpanded((value) => !value)}
              type="button"
            >
              Detalhes
              <ChevronDown
                className={cn("transition", expanded && "rotate-180")}
                size={17}
              />
            </button>
          </div>

          <AnimatePresence initial={false}>
            {expanded ? (
              <motion.div
                animate={{ height: "auto", opacity: 1 }}
                className="overflow-hidden"
                exit={{ height: 0, opacity: 0 }}
                initial={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mt-4 rounded-[1.1rem] border border-[#E8DDC9] bg-[#FFF9EE] p-4 text-sm font-semibold leading-6 text-muted">
                  {document.details?.length ? (
                    document.details.map((detail) => <p key={detail}>{detail}</p>)
                  ) : (
                    <p>Arquivo ainda pendente. Adicione o documento real em public/documents quando estiver disponível.</p>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
