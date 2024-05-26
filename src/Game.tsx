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

type SceneData = {
  dialogue?: DialogueData;
  decision?: DecisionData;
  prompt?: PromptData;
};

const CHARACTERS: Record<Character, CharacterData> = {
  [Character.Lucy]: { slug: "lucy", name: "Lucy" },
  [Character.Naveen]: { slug: "naveen", name: "Naveen" },
  [Character.Gabby]: { slug: "gabby", name: "Gabby" },
  [Character.Lalo]: { slug: "lalo", name: "Lalo" },
  [Character.Bird]: { slug: "bird", name: "Bird" },
};

type DialogueSequenceProps = {
  character: Character;
  messages: string[];
};

function getDialogueSequence({
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

export const GAME_SCENES: SceneData[] = [
  {
    dialogue: {
      character: Character.Lucy,
      message: "Glad you made it, recruit! What's your name?",
    },
    prompt: {
      variableKey: "NAME",
      label: "Submit",
      placeholder: "Your Name",
    },
  },
  ...getDialogueSequence({
    character: Character.Lucy,
    messages: [
      "Nice to meet you, {NAME}. You are going to be great. Here’s a case in your neighborhood, can you take care of it?",
      "We’re busy helping a werewolf who runs a food truck find his missing secret ingredient before the full moon appears.",
    ],
  }),
  ...getDialogueSequence({
    character: Character.Gabby,
    messages: [
      "Slow down, Lucy! First, I need to get them set up with our agency’s gadgets and spells.",
      "Hey there, {NAME}! Thanks for helping us out. Open this website on your phone and I’ll give this page some magical powers. You’ll be able to keep in touch with us and work on the case even if you don’t have wifi.",
    ],
  }),
  {
    dialogue: {
      character: Character.Lucy,
      message: "Here’s the letter, {NAME}. I believe in you!",
    },
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "Oh, Lalo must be at the 22nd Street Jungle Stairs! It used to be a staircase surrounded by weeds, but the people of the neighborhood planted over 1,200 trees to make it feel like a lush jungle. It has 12 species of plants native to California.",
    },
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "If you are near the Muni 24 bus, that’s a great way to get to the Jungle Stairs! Go to 22nd and Castro Street, then head west (that’s the direction towards Twin Peaks). Walk on the north side of the street and you should find a pair of statues. Let us know when you get there.",
    },
    decision: {
      choices: [
        {
          name: "I made it to 22nd and Castro!",
          isCorrect: true,
        }
      ],
    },
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "You made it to the 22nd Street Jungle Stairs! Great work. Did you find the pair of statues where our friend Lalo is hiding? What do they look like?",
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
      character: Character.Gabby,
      message: "Gabby: I’m picking up some wild readings from your phone’s sensors! There’s more to this jungle than meets the eye. Try to communicate with one of those statues. Make sure you pick the right one.",
    },
    decision: {
      choices: [
        {
          name: "Left Lion",
          message: "There was nothing in the statue.",
        },
        {
          name: "Right Lion",
          isCorrect: true,
        },
      ]
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡Miau!",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Whoa it's working!",
    }
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "Great job, {NAME}! I think because Lalo is nervous, you can’t see him with your human eyes.",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Just like that artist we helped earlier!",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Is that a lion or a cat?",
    }
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "I don’t think he’s a lion. He said in his letter that the statue only sort of looks like him.",
    }
  },
  {
    dialogue: {
      character: Character.Gabby,
      message: "Now that your phone can read the nearby energy, you can go talk to that cat.",
    },
    decision: {
      choices: [
        {
          name: "\"Are you Lalo the cat? I'm here to help!\"",
          isCorrect: true,
        }
      ],
    },
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡No soy un gato, soy un lince!",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Need help communicating with Lalo? I’ll help you turn on your language translator. We used it earlier when we sent Lalo’s letter to you.",
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡No soy un gato, soy un lince!",
      translation: "What language do you want to translate?",
    },
    decision: {
      choices: [
        {
          name: "Tagalog",
          message: "Translation failed. Try again.",
        },
        {
          name: "Spanish",
          isCorrect: true,
        },
        {
          name: "French",
          message: "Translation failed. Try again.",
        },
      ]
    },
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡No soy un gato, soy un lince!",
      translation: "I am not a cat, I am a _____!",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Whoops, the language translator is acting up. It’ll only be able to help you out with some parts. Try to figure out the rest from context clues!",
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡No soy un gato, soy un lince!",
      translation: "I am not a cat, I am a _____!",
    },
    decision: {
      choices: [
        {
          name: "Lion",
          message: "Translation failed. Try again.",
        },
        {
          name: "Lemur",
          message: "Translation failed. Try again.",
        },
        {
          name: "Lynx",
          isCorrect: true,
        },
      ]
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡No soy un gato, soy un lince!",
      translation: "I am not a cat, I am a lynx!",
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Gracias por venir a ayudarme.",
      translation: "Thank you for coming to _____.",
    },
    decision: {
      choices: [
        {
          name: "help me",
          isCorrect: true,
        },
        {
          name: "save me",
          message: "Translation failed. Try again.",
        },
        {
          name: "rescue me",
          message: "Translation failed. Try again.",
        },
      ]
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Gracias por venir a ayudarme.",
      translation: "Thank you for coming to help me.",
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Estoy buscando un pájaro azul.",
      translation: "I am searching for a _____ _____.",
    },
    decision: {
      choices: [
        {
          name: "blue bird",
          isCorrect: true,
        },
        {
          name: "blue parrot",
          message: "Translation failed. Try again.",
        },
        {
          name: "green parrot",
          message: "Translation failed. Try again.",
        },
      ]
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Estoy buscando un pájaro azul.",
      translation: "I am searching for a blue bird.",
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Escuché que ella puede ayudarme a llegar a casa.",
      translation: "I heard she can ______ get home.",
    },
    decision: {
      choices: [
        {
          name: "Now you translate!",
          isCorrect: true,
        },
      ]
    },
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "You already know this one!",
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Escuché que ella puede ayudarme a llegar a casa.",
      translation: "I heard she can ______ get home.",
    },
    prompt: {
      label: "Submit",
      placeholder: "Translate ayudarme"
    }
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "Escuché que ella puede ayudarme a llegar a casa.",
      translation: "I heard she can help me get home.",
    }
  },
  {
    dialogue: {
      character: Character.Gabby,
      message: "Nice work, {NAME}. We’re picking up an energy signal for a blue bird! She should be nearby. Keep walking west on 22nd Street and head up the Jungle Stairs to look for her.",
    }
  },
];

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

  const { dialogue, decision, prompt } = scenes[index];

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
      </div>
      <Controls {...controlsProps} />
    </>
  );
}