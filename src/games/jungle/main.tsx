import { SceneData, Character, getDialogueSequence } from '../../Game';


export const SCENES: SceneData[] = [
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