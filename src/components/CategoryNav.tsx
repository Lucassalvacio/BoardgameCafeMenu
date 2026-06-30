import type { MenuCategory } from '../types';

interface CategoryNavProps {
  categories: MenuCategory[];
}

export function CategoryNav({ categories }: CategoryNavProps) {
  const scrollTo = (idx: number) => {
    document.getElementById(`sec-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="cats">
      {categories.map((sec, idx) => (
        <button key={sec.category} className={idx === 0 ? 'active' : ''} onClick={() => scrollTo(idx)}>
          {sec.category}
        </button>
      ))}
    </nav>
  );
}
