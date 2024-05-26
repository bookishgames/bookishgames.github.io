import React from "react";
import { SceneData, Character, getDialogueSequence } from "../../Game";

function Letter() {
  return (
    <div className="game-content letter">
      <p>Dear Lucy Santos Detective Agency,</p>
      <p>Help me! I am lost and I don't know how to get home. I stepped through a portal in the forest and now I am stuck in some place the locals call Noe Valley.</p>
      <p>Luckily, I found a small, tall jungle where I can rest. I saw signs for 22nd Street and Castro Street. I cuddled up in a pair of statues that sort of look like me. My fur is getting cold and I wish I could go home.</p>
      <p>Please come soon,</p>
      <p>Lalo</p>
    </div>
  );
}

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
    custom: {
      component: <Letter />,
    }
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
      message: "Go to 3969 22nd Street!\nIf you are near the Muni 24 bus, that’s a great way to get there!\nWhen you reach the intersection of 22nd and Castro Street, head west (that’s the direction towards Twin Peaks). Walk on the north side of the street and you should find a pair of statues.\nLet us know when you get there.",
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
    },
    decision: {
      choices: [
        {
          name: "The translator didn't work!",
          isCorrect: true,
        },
      ]
    },
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
      placeholder: "Translate ayudarme",
      answer: "help me",
      message: "That's not it. Try again.",
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
    },
    decision: {
      choices: [
        {
          name: "I found the blue bird!",
          isCorrect: true,
        },
      ]
    },
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "The blue bird’s energy is coming out of that mural!\nOur detectives can communicate with creatures inside murals by using the name of the person who painted the mural.\nLook for a signature then enter their name into your phone!",
    },
    prompt: {
      label: "Submit",
      placeholder: "Who signed the mural?",
      answer: "fnnch",
      message: "That's not it. Try again.",
    }
  },
  ...getDialogueSequence({
    character: Character.Bird,
    messages: [
      "Hello, detective! I overheard you talking with that poor lynx. You must be looking for the Jungle Stairs portal. Like all jungles, we are connected by interdimensional pathways that allow creatures of jungles, forests, and woodlands to help each other in times of need.",
      "You can activate this jungle’s portal from the main staircase on the other side. Continue up this staircase, then cross Collingwood Street. Continue west and you will find the other staircase. If you look to the west, you’ll have a clear view of Sutro Tower, which is the key to opening the portal.",
      "One more thing: the portal is useless without a destination. If you want to help that lynx get home, you’ll need to know where his home forest is and think about that location when you activate the portal.",
    ],
  }),
  {
    dialogue: {
      character: Character.Lucy,
      message: "Ask Lalo where his home is!",
    },
    decision: {
      choices: [
        {
          name: "Where are you from, Lalo?",
          message: "Ask him in Spanish!",
        },
        {
          name: "¿De dónde eres, Lalo?",
          isCorrect: true,
        },
      ]
    },
  },
  {
    dialogue: {
      character: Character.Lalo,
      message: "¡Soy de mi casa! Vivo en un hermoso bosque.",
      translation: "I am from my home! I live in a beautiful forest.",
    }
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "Ahh, our lynx friend has probably never been this far from home. But I trust you to figure out where he’s from.",
    }
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "There are four species of lynx in the whole world. If you figure out which kind of lynx Lalo is, we can find his home.",
    },
    decision: {
      choices: [
        {
          name: "Canada Lynx",
          message: "That's not it. Try again.",
        },
        {
          name: "Eurasian Lynx",
          message: "That's not it. Try again.",
        },
        {
          name: "Iberian Lynx",
          isCorrect: true,
        },
        {
          name: "Red Lynx",
          message: "Commonly known as the bobcat! But that's not it. Try again.",
        },
      ]
    }
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "You’re right! Wait a minute… the Iberian lynx is an endangered species.\nAccording to the International Union for Conservation of Nature, back in 2002, there were only 94 Iberian lynx in the whole world.",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Is the plural of lynx lynx or lynxes?? By the way, a group of lynxes is called a chain!",
    }
  },
  {
    dialogue: {
      character: Character.Naveen,
      message: "So cool! Oh, and either plural form works.\nBut many people and organizations worked hard to repair the lynxes’ habitats, resupply the rabbits they eat, and protect their chains. As of May 2023, the population of Iberian lynx has grown to 1,668!",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "So cool! I’m glad they helped out those sweet kitties!",
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
      character: Character.Naveen,
      message: "The Iberian lynx are from the Iberian peninsula, which is the part of the world where Spain and Portugal are! The lynx live in the Dehesa, a special type of forest in the Andalusia region of Spain. That’s where the city of Seville is!",
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "Now that we know Lalo’s home, let’s go find that portal! Follow the blue bird’s instructions to find the main staircase.\nContinue up this staircase, then cross Collingwood Street. Continue west and you will find the other staircase. If you look to the west, you’ll have a clear view of Sutro Tower.\nLet us know when you get there.",
    },
    decision: {
      choices: [
        {
          name: "I found the main staircase.",
          isCorrect: true,
        }
      ]
    }
  },
  {
    dialogue: {
      character: Character.Lucy,
      message: "What do you see near the top of the stairs on the north side?",
    },
    decision: {
      choices: [
        {
          name: "Book Case",
          isCorrect: true,
        },
        {
          name: "Clock Tower",
          message: "That's not it. Keep searching.",
        },
        {
          name: "Gumball Machine",
          message: "That's not it. Keep searching.",
        },
      ]
    }
  },
  {
    dialogue: {
      character: Character.Bird,
      message: "You made it! Head down to the middle where the two staircases meet and look west to find Sutro Tower.",
    },
    decision: {
      choices: [
        {
          name: "Found it.",
          isCorrect: true,
        }
      ]
    }
  },
];