import type { BoardGame } from '../types';

interface ManualModalProps {
  game: BoardGame | null;
  onClose: () => void;
}

export function ManualModal({ game, onClose }: ManualModalProps) {
  return (
    <div
      className={`overlay${game ? ' open' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {game && (
        <div className="drawer">
          <div className="drawer-head">
            <h2>{game.name} — How to Play</h2>
            <button className="close-x" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="manual-body">
            <div className="manual-meta">
              <div>
                <b>{game.players}</b>Players
              </div>
              <div>
                <b>{game.time}</b>Play time
              </div>
              <div>
                <b>{game.difficulty}</b>Difficulty
              </div>
            </div>
            <h3>Overview</h3>
            <p>{game.desc}</p>
            <h3>How to play</h3>
            <ul>
              {game.manualSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
