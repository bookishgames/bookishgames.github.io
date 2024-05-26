/* global localStorage */
import React, { useEffect, useState } from "react";

export enum Character {
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
  translation?: string;
};

type ChoiceData = {
  name: string;
  isCorrect?: boolean;
  message?: string;
};

type DecisionData = {
  choices: ChoiceData[];
};

type PromptData = {
  label: string;
  placeholder: string;
  variableKey?: string;
};

type CustomData = {
  component: React.JSX.Element;
};

export type SceneData = {
  dialogue?: DialogueData;
  decision?: DecisionData;
  prompt?: PromptData;
  custom?: CustomData;
};

type DialogueSequenceProps = {
  character: Character;
  messages: string[];
};

export function getDialogueSequence({
  character,
  messages,
}: DialogueSequenceProps): SceneData[] {
  return messages.map((message) => ({
    dialogue: {
      character,
      message,
    }
  }));
}

const CHARACTERS: Record<Character, CharacterData> = {
  [Character.Lucy]: { slug: "lucy", name: "Lucy" },
  [Character.Naveen]: { slug: "naveen", name: "Naveen" },
  [Character.Gabby]: { slug: "gabby", name: "Gabby" },
  [Character.Lalo]: { slug: "lalo", name: "Lalo" },
  [Character.Bird]: { slug: "bird", name: "Bird" },
};

type GameVariables = Record<string, string>;

type VariablesProps = {
  variables: GameVariables;
};

type DialogueProps = DialogueData & VariablesProps;

function injectVariables(message: string, variables: GameVariables): string {
  // TBH, this was all ChatGPT. I don't know if this supports more than one
  // variable, but that's fine for now.
  return message.replace(/{(\w+)}/g, (match, p1) => variables[p1] || match);
}

function Dialogue({
  character,
  message,
  translation,
  variables,
}: DialogueProps) {
  const { name, slug } = CHARACTERS?.[character];
  const src = `/images/${slug}.png`;
  const translationClass = translation ? 'with-translation' : 'no-translation';

  return (
    <div className={`dialogue ${translationClass} game-content`}>
      <div className="speech-bubble message">
        <h3>{name}</h3>
        <p>{injectVariables(message, variables)}</p>
      </div>
      {translation && (
        <div className="speech-bubble translation">
          <p>{translation}</p>
        </div>
      )}
      <div className="character">
        <img src={src} alt={name} />
      </div>
    </div>
  );
}

type NextSceneProps = {
  setNextIndex: () => void;
};

type DecisionProps = DecisionData & NextSceneProps;

function Decision({ choices, setNextIndex }: DecisionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    setSelected(null);
  }, [choices]);
  const selectedChoice = choices?.[selected ?? -1] || null;

  return (
    <div className="decision game-content">
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

type SaveVariableProps = {
  variables: GameVariables,
  setVariable: (key: string, value: string) => void;
};

type PromptProps = PromptData & NextSceneProps & SaveVariableProps;

function Prompt({
  label,
  placeholder,
  variableKey,
  setNextIndex,
  variables,
  setVariable,
}: PromptProps) {
  const [value, setValue] = useState<string>('');
  useEffect(() => {
    if (variableKey == null) return;
    const savedValue = variables?.[variableKey];
    if (savedValue) {
      setValue(savedValue);
    }
  }, [variableKey, variables]);
  const doSubmit = (key: string | null, val: string) => {
    if (key != null) {
      setVariable(key, val);
    }
    setNextIndex();
  };
  return (
    <div className="prompt game-content">
      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="button primary"
        onClick={() => doSubmit(variableKey ?? null, value)}
      >{label}</button>
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
const GAME_VARIABLES_KEY = 'bookish__jungle__game_variables';

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

  const [variables, setVariables] = useState<GameVariables>({});

  useEffect(() => {
    const rawVariables = localStorage.getItem(GAME_VARIABLES_KEY);
    if (!rawVariables) return;
    const storedVariables = JSON.parse(rawVariables);
    setVariables(storedVariables);
  }, []);

  const setVariable = (key: string, value: string) => {
    setVariables((vars) => {
      const newVariables = {
        ...vars,
        [key]: value,
      };
      const rawVariables = JSON.stringify(newVariables);
      localStorage.setItem(GAME_VARIABLES_KEY, rawVariables);
      return newVariables;
    });
  };

  const { dialogue, decision, prompt, custom } = scenes[index];

  const hasNextScene = index < scenes.length - 1;
  const notSkippable = decision != null || prompt != null;
  const hasPrev = index > 0;
  const hasNext = !notSkippable && hasNextScene;
  const setPrevIndex = () => setIndex(n => storeIndex(n - 1));
  const setNextIndex = () => setIndex(n => storeIndex(n + 1));
  const controlsProps = {
    hasPrev,
    hasNext,
    setPrevIndex,
    setNextIndex,
  };
  const nextProps = { setNextIndex };
  const varProps = { variables, setVariable };

  return (
    <>
      <div className="game-container">
        {dialogue && <Dialogue {...{ ...dialogue, variables }} />}
        {decision && <Decision {...{ ...decision, ...nextProps }} />}
        {prompt && <Prompt {...{ ...prompt, ...nextProps, ...varProps }} />}
        {custom && custom.component}
      </div>
      <Controls {...controlsProps} />
    </>
  );
}