export type MainTab = 'menu' | 'games';

interface TabBarProps {
  active: MainTab;
  onChange: (tab: MainTab) => void;
}

export function TabBar({ active, onChange }: TabBarProps) {
  return (
    <div className="tabbar">
      <button className={active === 'menu' ? 'active' : ''} onClick={() => onChange('menu')}>
        Menu
      </button>
      <button className={active === 'games' ? 'active' : ''} onClick={() => onChange('games')}>
        Game Library
      </button>
    </div>
  );
}
