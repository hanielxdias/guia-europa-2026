import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Buscar por nome",
}: SearchInputProps) {
  return (
    <label className="relative block">
      <span className="sr-only">{placeholder}</span>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coral"
        size={18}
      />
      <input
        className="h-12 w-full rounded-full border border-gold/25 bg-paper pl-11 pr-4 text-sm font-semibold text-text outline-none transition placeholder:text-muted/70 focus:border-gold focus:ring-4 focus:ring-gold/15"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
      />
    </label>
  );
}
