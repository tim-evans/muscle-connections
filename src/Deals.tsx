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
    Math.max(Math.floor(Math.random() * 5), 1),
    correct.length
  );
  let incorrectCount = 6 - correctCount;
  let answers = shuffle(correct).slice(0, correctCount);
  let hand = [...shuffle(incorrect).slice(0, incorrectCount), ...answers];
  if (hand.length < 6) {
    hand.push(
      ...shuffle(
        deck.filter((d) => !hand.find((m) => d.name === m.name))
      ).slice(0, 6 - hand.length)
    );
  }
  console.log(correct, answers);

  return [shuffle(hand), answers];
}

export function Deals(props: { data: Muscle[] }) {
  let { question, deck, answer } = useMemo(() => {
    let challenge = challenges[Math.floor(challenges.length * Math.random())];
    let attrs = challenge(props.data);
    let [deck, answer] = deal(attrs.deck, attrs.answer, props.data);
    return { question: attrs.question, deck, answer };
  }, [props.data]);
  let [hand, setHand] = useState(deck);
  let [cards, setCards] = useState<Muscle[]>([]);

  return (
    <div>
      <h1>{question}</h1>
      <button
        onClick={(evt) => {
          evt.preventDefault();
          if (answer.length !== cards.length) {
            alert("NO, it is " + answer.map((m) => m.name).join(", "));
          } else if (
            answer.every((muscle) => cards.find((c) => c.name === muscle.name))
          ) {
            alert("YES");
          } else {
            alert("NO, it is " + answer.map((m) => m.name).join(", "));
          }
          return false;
        }}
      >
        Play Hand
      </button>
      <div className="card-played">
        {cards.map((card) => (
          <div className="card" key={card.name}>
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
