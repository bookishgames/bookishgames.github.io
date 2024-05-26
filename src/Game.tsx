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

type DialogueData = {
  character: Character;
  message: string;
};

type ChoiceData = {
  name: string;
  isCorrect?: boolean;
  message?: string;
};

type DecisionData = {
  choices: ChoiceData[];
};

type SceneData = {
  dialogue?: DialogueData;
  decision?: DecisionData;
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
  {
    dialogue: {
      character: Character.Lucy,
      message: "Nice work, you found them!",
    }
  },
];

type DialogueProps = DialogueData;

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

type DecisionProps = DecisionData & {
  setNextIndex: () => void;
};

function Decision({ choices, setNextIndex }: DecisionProps) {
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
          const selectedClass = i === selected ? "chosen" : "not-chosen";
          const doSelect = (j: number) => {
            setSelected(j);
            if (isCorrect) {
              setNextIndex();
            }
          };
          return (
            <div key={name} className="choice">
              <button
                className={`button secondary ${selectedClass}`}
                onClick={() => doSelect(i)}
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

  const { dialogue, decision } = scenes[index];

  const hasNextScene = index < scenes.length - 1;
  const hasDecision = decision != null;
  const hasPrev = index > 0;
  const hasNext = !hasDecision && hasNextScene;
  const setPrevIndex = () => setIndex(n => storeIndex(n - 1));
  const setNextIndex = () => setIndex(n => storeIndex(n + 1));
  const controlsProps = {
    hasPrev,
    hasNext,
    setPrevIndex,
    setNextIndex,
  };
  return (
    <>
      <div className="game-container">
        {dialogue && <Dialogue {...dialogue} />}
        {decision && <Decision {...decision} setNextIndex={setNextIndex} />}
      </div>
      <Controls {...controlsProps} />
    </>
  );
}