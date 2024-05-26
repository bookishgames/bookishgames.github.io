import React, { useState } from "react";

enum Character {
  Lucy = 'lucy',
  Naveen = 'naveen',
  Gabby = 'gabby',
  Lalo = 'lalo',
  Bird = 'bird',
};

type CharacterData = {
  slug: string;
  name: string;
};

const CHARACTERS: Record<Character, CharacterData> = {
  [Character.Lucy]: { slug: "lucy", name: "Lucy" },
  [Character.Naveen]: { slug: "naveen", name: "Naveen" },
  [Character.Gabby]: { slug: "gabby", name: "Gabby" },
  [Character.Lalo]: { slug: "lalo", name: "Lalo" },
  [Character.Bird]: { slug: "bird", name: "Bird" },
};

type DialogueProps = {
  character: Character;
  messages: string[];
};

function Dialogue({ character, messages }: DialogueProps) {
  const { name, slug } = CHARACTERS?.[character];
  const src = `/images/${slug}.png`;

  const [index, setIndex] = useState<number>(0);
  const hasPrev = index > 0;
  const hasNext = index < messages.length - 1;
  const setPrevIndex = () => setIndex(n => n - 1);
  const setNextIndex = () => setIndex(n => n + 1);

  return (
    <div className="character-dialogue">
      <div className="speech-bubble">
        <h3>{name}</h3>
        <p>{messages[index]}</p>
        <div className="dialogue-controls">
          <button onClick={setPrevIndex} disabled={!hasPrev}>Back</button>
          <button onClick={setNextIndex} disabled={!hasNext}>Next</button>
        </div>
      </div>
      <div className="character-image">
        <img src={src} alt={name} />
      </div>
    </div>
  );
}

export default function Game() {
  return (
    <>
      <Dialogue character={Character.Lucy} messages={["Glad you made it, recruit! You are going to be great.", "Here’s a case in your neighborhood, can you take care of it?"]} />
    </>
  );
}