import type { BoardGame, CartMap } from '../types';

interface GameLibraryProps {
  games: BoardGame[];
  cart: CartMap;
  onToggleGame: (id: string) => void;
  onViewManual: (game: BoardGame) => void;
}

function difficultyClass(diff: BoardGame['difficulty']) {
  if (diff === 'Easy') return 'diff-easy';
  if (diff === 'Hard') return 'diff-hard';
  return 'diff-medium';
}

export function GameLibrary({ games, cart, onToggleGame, onViewManual }: GameLibraryProps) {
  return (
    <>
      <h2 className="section-title">Game Library</h2>
      <p className="games-subtext">
        Games are free to play with your table. Tap "Bring to Table" and staff will deliver it.
      </p>
      <div className="game-grid">
        {games.map((g) => {
          const added = Boolean(cart[g.id]);
          return (
            <div className="game-card" key={g.id}>
              <div className="game-top">
                <p className="game-name">{g.name}</p>
              </div>
              <div className="game-tags">
                <span className="game-tag">👥 {g.players}</span>
                <span className="game-tag">⏱ {g.time}</span>
                <span className={`game-tag ${difficultyClass(g.difficulty)}`}>{g.difficulty}</span>
              </div>
              <p className="game-desc">{g.desc}</p>
              <div className="game-actions">
                <button className="ghost-btn" onClick={() => onViewManual(g)}>
                  View Manual
                </button>
                <button
                  className={`order-game-btn${added ? ' added' : ''}`}
                  onClick={() => onToggleGame(g.id)}
                >
                  {added ? 'Added ✓' : 'Bring to Table'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
