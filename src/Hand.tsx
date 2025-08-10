import { Muscle } from "./types";

export function Hand(props: { cards: Muscle[]; onPlay(card: Muscle): void }) {
  return (
    <div className={`card-hand count-${props.cards.length}`}>
      {props.cards.map((card) => (
        <div className="card" onClick={() => props.onPlay(card)}>
          {card.name}
        </div>
      ))}
    </div>
  );
}
