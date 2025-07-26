// 📄 app/components/ui/SearchBar.tsx
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  debounceTime?: number;
  placeholder?: string;
};

export function SearchBar({ 
  onSearch, 
  debounceTime = 300,
  placeholder = "Cari..." 
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, debounceTime);

    return () => clearTimeout(timer);
  }, [query, debounceTime]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-light)] opacity-60" size={18} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-[var(--brand-darker)] rounded-xl border border-[var(--brand-darker)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-gold)] text-[var(--brand-light)] placeholder-[var(--brand-light)] placeholder-opacity-60"
      />
    </div>
  );
}