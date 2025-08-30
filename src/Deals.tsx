import { useMemo, useState } from "react";
import { Muscle } from "./types";
import { Hand } from "./Hand";
import challenges from "./challenges";

function shuffle<T>(items: T[]) {
  let currentIndex = items.length;
  let shuffled = [...items];

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }
  return shuffled;
}

function deal(
  incorrect: Muscle[],
  correct: Muscle[],
  deck: Muscle[]
): [Muscle[], Muscle[]] {
  let correctCount = Math.min(
    Math.max(Math.round(Math.random() * 5), 1),
    correct.length
  );
  let incorrectCount = 5 - correctCount;
  let answers = shuffle(correct).slice(0, correctCount);
  let hand = [...shuffle(incorrect).slice(0, incorrectCount), ...answers];
  if (hand.length < 5) {
    hand.push(
      ...shuffle(
        deck.filter((d) => !hand.find((m) => d.name === m.name))
      ).slice(0, 5 - hand.length)
    );
  }

  return [shuffle(hand), answers];
}

export function Deals(props: { data: Muscle[] }) {
  let [seed, setSeed] = useState(Math.random());
  let [lastDeals, setLastDeals] = useState<string[]>([]);
  let [hand, setHand] = useState<Muscle[]>([]);
  let [cards, setCards] = useState<Muscle[]>([]);
  let [played, setPlayed] = useState(false);
  let { question, answer } = useMemo(() => {
    let challenge = challenges[Math.floor(challenges.length * seed)];
    let attrs = challenge(props.data, lastDeals);
    let [deck, answer] = deal(attrs.deck, attrs.answer, props.data);
    setHand(deck);
    setLastDeals([attrs.id, ...lastDeals.slice(0, 4)]);
    setCards([]);
    setPlayed(false);
    return { question: attrs.question, deck, answer };
  }, [props.data, seed]);

  return (
    <div>
      <h1>{question}</h1>
      {!played && (
        <button
          onClick={(evt) => {
            evt.preventDefault();
            setPlayed(true);
            return false;
          }}
        >
          Play Hand
        </button>
      )}
      {played && (
        <button
          onClick={(evt) => {
            evt.preventDefault();
            setSeed(Math.random());
            return false;
          }}
        >
          Next Hand
        </button>
      )}
      <div className="card-played">
        {cards.map((card) => (
          <div
            className={`card ${
              played
                ? answer.find((a) => a.name === card.name)
                  ? "correct"
                  : "incorrect"
                : ""
            }`}
            onClick={() => {
              setCards(cards.filter((c) => c.name !== card.name));
              setHand([...hand, card]);
            }}
            key={card.name}
          >
            {card.name}
          </div>
        ))}
        {played &&
          answer
            .filter((card) => !cards.includes(card))
            .map((card) => (
              <div className="card incorrect" key={card.name}>
                {card.name}
              </div>
            ))}
      </div>
      <Hand
        cards={hand}
        onPlay={(card) => {
          setHand(hand.filter((c) => c.name !== card.name));
          setCards([...cards, card]);
        }}
      />
    </div>
  );
}
