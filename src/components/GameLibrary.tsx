import type { BoardGame, CartMap, StaffOrder } from "../types";

interface GameLibraryProps {
    games: BoardGame[];
    cart: CartMap;
    customerOrders: StaffOrder[];
    onToggleGame: (id: string) => void;
    onViewManual: (game: BoardGame) => void;
}

function difficultyClass(diff: BoardGame["difficulty"]) {
    if (diff === "Easy") return "diff-easy";
    if (diff === "Hard") return "diff-hard";
    return "diff-medium";
}

export function GameLibrary({
    games,
    cart,
    customerOrders,
    onToggleGame,
    onViewManual,
}: GameLibraryProps) {

    return (
        <>
            <h2 className="section-title">Game Library</h2>

            <p className="games-subtext">
                Games are free to play with your table. Tap "Bring to Table"
                and staff will deliver it.
            </p>

            <div className="game-grid">

                {games.map((g) => {

                    const added = Boolean(cart[g.id]);

                    const alreadyOrdered = customerOrders
                        .filter(order => !order.paid)
                        .some(order =>
                            order.items.some(item =>
                                item.type === "game" &&
                                item.id === g.id
                            )
                        );

                    const availableCopies =
                        g.totalCopies - g.inUseCopies;

                    const available = availableCopies > 0;

                    return (

                        <div
                            className="game-card"
                            key={g.id}
                        >

                            <div className="game-top">

                                <p className="game-name">
                                    {g.name}
                                </p>

                                <span
                                    className={`game-availability ${
                                        available
                                            ? "available"
                                            : "unavailable"
                                    }`}
                                >
                                    {available
                                        ? `🟢 ${availableCopies} Available`
                                        : "🔴 In Use"}
                                </span>

                            </div>

                            <div className="game-tags">

                                <span className="game-tag">
                                    👥 {g.players}
                                </span>

                                <span className="game-tag">
                                    ⏱ {g.time}
                                </span>

                                <span
                                    className={`game-tag ${difficultyClass(
                                        g.difficulty
                                    )}`}
                                >
                                    {g.difficulty}
                                </span>

                            </div>

                            <p className="game-desc">
                                {g.desc}
                            </p>

                            <div className="game-actions">

                                <button
                                    className="ghost-btn"
                                    onClick={() => onViewManual(g)}
                                >
                                    View Manual
                                </button>

                                <button
                                    className={`order-game-btn${added ? " added" : ""}`}
                                    disabled={!available || alreadyOrdered}
                                    onClick={() => onToggleGame(g.id)}
                                >
                                    {alreadyOrdered
                                        ? "Already Requested"
                                        : !available
                                        ? "Currently In Use"
                                        : added
                                        ? "Added ✓"
                                        : "Bring to Table"}
                                </button>

                            </div>

                        </div>

                    );
                })}

            </div>
        </>
    );
}