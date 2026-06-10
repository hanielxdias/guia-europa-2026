import { Compass } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center">
      <div className="mb-4 rounded-2xl bg-navy/10 p-4 text-navy">
        <Compass size={28} />
      </div>
      <h3 className="text-lg font-extrabold text-text">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{message}</p>
    </div>
  );
}
