/* global localStorage */
import React, { useEffect, useState } from "react";

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

type DialogueProps = {
  character: Character;
  message: string;
};

type ChoiceProps = {
  name: string;
  isCorrect?: boolean;
  message?: string;
};

type DecisionProps = {
  choices: ChoiceProps[];
};

type SceneData = {
  dialogue?: DialogueProps;
  decision?: DecisionProps;
};

const CHARACTERS: Record<Character, CharacterData> = {
  [Character.Lucy]: { slug: "lucy", name: "Lucy" },
  [Character.Naveen]: { slug: "naveen", name: "Naveen" },
  [Character.Gabby]: { slug: "gabby", name: "Gabby" },
  [Character.Lalo]: { slug: "lalo", name: "Lalo" },
  [Character.Bird]: { slug: "bird", name: "Bird" },
};

export const GAME_SCENES: SceneData[] = [
  {
    dialogue: {
      character: Character.Lucy,
      message: "Glad you made it, recruit! You are going to be great.",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Here’s a case in your neighborhood, can you take care of it?",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "What kind of statues do you see?",
    },
    decision: {
      choices: [
        {
          name: "Lions",
          isCorrect: true,
        },
        {
          name: "Flamingos",
          message: "I'm not reading any flamingos...",
        },
        {
          name: "Monkeys",
          message: "I'm not reading any monkeys...",
        },
      ]
    }
  },
];

function Dialogue({ character, message }: DialogueProps) {
  const { name, slug } = CHARACTERS?.[character];
  const src = `/images/${slug}.png`;

  return (
    <div className="dialogue">
      <div className="speech-bubble">
        <h3>{name}</h3>
        <p>{message}</p>
      </div>
      <div className="character">
        <img src={src} alt={name} />
      </div>
    </div>
  );
}

function Decision({ choices }: DecisionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const selectedChoice = choices?.[selected || -1] || null;

  return (
    <div className="decision">
      <div className="message">
        {selectedChoice?.message && (
          <p>{selectedChoice.message}</p>
        )}
      </div>
      <div className="choices">
        {choices.map(({ name, isCorrect, message }, i) => {
          return (
            <div key={name} className="choice">
              <button
                className="button secondary"
                onClick={() => setSelected(i)}
              >{name}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type ControlsProps = {
  hasPrev: boolean;
  hasNext: boolean;
  setPrevIndex: () => void;
  setNextIndex: () => void;
};

function Controls({
  hasPrev,
  hasNext,
  setPrevIndex,
  setNextIndex,
}: ControlsProps) {
  return (
    <div className="game-controls">
      <button
        className="button secondary"
        onClick={setPrevIndex}
        disabled={!hasPrev}
      >Back</button>
      <button
        className="button secondary"
        onClick={setNextIndex}
        disabled={!hasNext}
      >Next</button>
    </div>
  );
}

type GameProps = {
  scenes: SceneData[],
};

const SCENE_INDEX_KEY = 'bookish__jungle__scene_index';

export default function Game({ scenes }: GameProps) {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const rawIndex = localStorage.getItem(SCENE_INDEX_KEY);
    if (!rawIndex) return;
    const storedIndex = JSON.parse(rawIndex);
    setIndex(storedIndex);
  }, [scenes]);

  const storeIndex = (newIndex: number): number => {
    localStorage.setItem(SCENE_INDEX_KEY, JSON.stringify(newIndex));
    return newIndex;
  };

  const hasPrev = index > 0;
  const hasNext = index < scenes.length - 1;
  const setPrevIndex = () => setIndex(n => storeIndex(n - 1));
  const setNextIndex = () => setIndex(n => storeIndex(n + 1));
  const controlsProps = {
    hasPrev,
    hasNext,
    setPrevIndex,
    setNextIndex,
  };

  const scene = scenes[index];
  return (
    <>
      <div className="game-container">
        {scene.dialogue && <Dialogue {...scene.dialogue} />}
        {scene.decision && <Decision {...scene.decision} />}
      </div>
      <Controls {...controlsProps} />
    </>
  );
}