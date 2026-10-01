import { Article, GlossaryTerm } from '../types';

export const ARTICLES_DATA: Article[] = [
  {
    id: 'solar-energy-record',
    title: 'Clean Solar Energy Hits A Historic High Around The Globe',
    simpleTitle: 'The Sun Is Powering More Homes Than Ever Before',
    category: 'Nature',
    categoryLabel: 'Environment & Earth',
    categoryIcon: 'Sun',
    date: 'Sep 18, 2026',
    readTime: '2 min read',
    imageUrl: '/images/solar_energy_field_1790144404253.jpg',
    imageCaption: 'Solar panels soaking in bright sunlight to create electricity.',
    featured: true,
    shortSnippet: 'More electricity was generated from sunlight in the last twelve months than from any other new energy source in history.',
    superSimpleSnippet: 'Countries across the world are putting up solar panels. Now, lots of families get their clean power directly from sunlight!',
    takeaways: [
      'Solar panels made more electricity this year than ever before in history.',
      'The price to build solar equipment dropped by almost 30% over the last few years.',
      'Clean power keeps the air we breathe fresher and helps stop global warming.'
    ],
    whyItMatters: 'Electricity powers our lights, refrigerators, and school computers. Making it from sunshine means less dirty smoke in the air.',
    sections: [
      {
        heading: 'What Just Happened?',
        paragraph: 'A new global energy report shows that solar power is growing faster than anyone expected.Large fields with shiny panels and rooftops on ordinary houses collected record amounts of sunlight and turned it into clean electricity.'
      },
      {
        heading: 'Why Is Solar Growing So Fast?',
        paragraph: 'A few years ago, solar panels were quite expensive. But scientists and factories found smarter ways to build them. Today, in many places, making energy from the sun is actually cheaper than burning coal or gas.'
      },
      {
        heading: 'What Comes Next?',
        paragraph: 'Cities are now installing big batteries that can store extra sunshine electricity. That means when the sun goes down at night, your lamps and TV can still run on power that was captured during the sunny afternoon!'
      }
    ],
    wordsToKnow: [
      {
        word: 'Solar Panel',
        pronunciation: 'SOH-ler PAN-ul',
        simpleMeaning: 'A flat dark board that catches light from the sun and turns it into electricity.',
        exampleSentence: 'Many school roofs now have solar panels to power classroom lights.'
      },
      {
        word: 'Renewable Energy',
        pronunciation: 'ree-NOO-uh-bul EN-er-jee',
        simpleMeaning: 'Energy that never runs out because nature constantly replaces it (like wind, water, and sun).',
        exampleSentence: 'Wind and sunshine are great kinds of renewable energy.'
      },
      {
        word: 'Electricity',
        pronunciation: 'ee-lek-TRIS-uh-tee',
        simpleMeaning: 'The power that flows through wires to turn on lamps, phones, and refrigerators.',
        exampleSentence: 'We need electricity to charge our laptops every evening.'
      }
    ]
  },
  {
    id: 'space-telescope-water',
    title: 'Astronomers Find Signs of Water Clouds On A Distant Planet',
    simpleTitle: 'Scientists Spot Water Clouds Floating in Deep Space',
    category: 'Science',
    categoryLabel: 'Space & Science',
    categoryIcon: 'Sparkles',
    date: 'Sep 17, 2026',
    readTime: '3 min read',
    imageUrl: '/images/space_telescope_planet_1790144424746.jpg',
    imageCaption: 'A deep view into space showing stars, planets, and cosmic clouds.',
    featured: false,
    shortSnippet: 'Giant telescopes in orbit have detected water vapor in the sky of a planet far beyond our solar system.',
    superSimpleSnippet: 'A telescope in space looked at a far-away planet and found clouds made of water, just like the clouds over our heads!',
    takeaways: [
      'A space telescope studied light passing through a distant planet’s atmosphere.',
      'The data showed clear traces of water vapor floating high in the sky.',
      'Finding water helps scientists learn if living things could exist far away.'
    ],
    whyItMatters: 'Water is one of the most important ingredients for life. Discovering water on other worlds helps us understand our place in the universe.',
    sections: [
      {
        heading: 'Looking Far Into Deep Space',
        paragraph: 'Far outside our solar system, a planet orbits its own warm star. Scientists used an extremely powerful space telescope that orbits Earth to peek at this faraway world.'
      },
      {
        heading: 'How Can You See Water From So Far?',
        paragraph: 'Scientists cannot visit the planet with a spaceship because it is too far. Instead, they look at starlight that shines through the planet’s sky. When light hits water, it creates a special pattern called a spectrum. The telescope detected that exact pattern.'
      },
      {
        heading: 'Does Anyone Live There?',
        paragraph: 'This particular planet is very hot and made mostly of gas, so humans could not walk on it. However, finding water vapor shows that our telescopes are now sharp enough to spot life-friendly worlds in the near future.'
      }
    ],
    wordsToKnow: [
      {
        word: 'Astronomer',
        pronunciation: 'uh-STRON-uh-mer',
        simpleMeaning: 'A scientist who studies the stars, planets, and outer space.',
        exampleSentence: 'The astronomer spent the night observing the moon with a telescope.'
      },
      {
        word: 'Atmosphere',
        pronunciation: 'AT-muhs-feer',
        simpleMeaning: 'The blanket of air and gases surrounding a planet.',
        exampleSentence: 'Earth’s atmosphere gives us oxygen to breathe and keeps us warm.'
      },
      {
        word: 'Telescope',
        pronunciation: 'TEL-uh-skope',
        simpleMeaning: 'A long tool with special lenses and mirrors that makes far-away things look close.',
        exampleSentence: 'Looking through a telescope, you can see craters on the moon.'
      }
    ]
  },
  {
    id: 'ai-helping-doctors',
    title: 'Friendly Computer Programs Help Doctors Spot Illnesses Faster',
    simpleTitle: 'Smart Computers Are Helping Doctors Keep People Healthy',
    category: 'Tech',
    categoryLabel: 'Technology & Health',
    categoryIcon: 'Cpu',
    date: 'Sep 16, 2026',
    readTime: '2 min read',
    imageUrl: '/images/ai_medical_health_1790144442247.jpg',
    imageCaption: 'A doctor using an iPad and digital monitor to inspect medical scans.',
    featured: false,
    shortSnippet: 'Hospitals are testing smart computer tools that can review X-rays in seconds and assist human doctors.',
    superSimpleSnippet: 'New computer programs can look at medical pictures very fast. They point out spots that doctors should take a closer look at.',
    takeaways: [
      'Smart software reviews medical scans in less than two seconds.',
      'Human doctors still make all final decisions and care for the patients.',
      'This technology helps patients get their test results much earlier.'
    ],
    whyItMatters: 'When doctors can spot an illness early, treatments are much simpler and patients can get back to feeling happy and healthy sooner.',
    sections: [
      {
        heading: 'A Helpful Assistant in the Clinic',
        paragraph: 'When you break an arm or have a bad cough, doctors take an image called an X-ray. Today, hospitals are starting to use computer programs that highlight tiny cracks in bones or spots in lungs in seconds.'
      },
      {
        heading: 'Computers Work Together With Humans',
        paragraph: 'The computer does not replace the doctor. Think of it like a spellchecker when you write a letter. The computer highlights what it sees, but the human doctor uses their medical wisdom to decide what medicine or rest you need.'
      },
      {
        heading: 'Saving Time In Busy Hospitals',
        paragraph: 'In emergency rooms, doctors must see dozens of people quickly. By having a digital helper read routine scans, doctors spend less time clicking on screens and more time speaking kindly to patients.'
      }
    ],
    wordsToKnow: [
      {
        word: 'Artificial Intelligence',
        pronunciation: 'ar-tuh-FISH-ul in-TEL-uh-juns',
        simpleMeaning: 'Computer systems designed to learn patterns and do tasks that usually require human thinking.',
        exampleSentence: 'Artificial intelligence can recognize faces or translate languages.'
      },
      {
        word: 'Diagnosis',
        pronunciation: 'dye-ug-NOH-sis',
        simpleMeaning: 'When a doctor discovers and names what illness a patient has.',
        exampleSentence: 'After checking his sore throat, the doctor gave a diagnosis of the flu.'
      }
    ]
  },
  {
    id: 'ocean-coral-rescue',
    title: 'Divers Plant Thousands of Baby Corals to Heal Tropical Reefs',
    simpleTitle: 'Divers Are Planting Colorful Baby Corals Under The Sea',
    category: 'Nature',
    categoryLabel: 'Ocean Life',
    categoryIcon: 'Waves',
    date: 'Sep 15, 2026',
    readTime: '3 min read',
    imageUrl: '/images/ocean_clean_water_1790144463600.jpg',
    imageCaption: 'Vibrant underwater coral reef full of tropical fish and crystal-clear water.',
    featured: false,
    shortSnippet: 'Marine biologists are growing heat-resilient coral in ocean nurseries and replanting them on damaged reefs.',
    superSimpleSnippet: 'Divers are growing baby sea corals in safe underwater gardens, then gluing them onto rocks so clownfish and turtles have homes.',
    takeaways: [
      'Over 20,000 nursery-grown corals were placed on damaged reefs this month.',
      'Special coral types were chosen because they can handle warmer ocean water.',
      'Fish, turtles, and sea snails have already started returning to the reef.'
    ],
    whyItMatters: 'Coral reefs are like the cities of the ocean. A quarter of all marine animals depend on healthy coral to find food and safety.',
    sections: [
      {
        heading: 'Gardening at the Bottom of the Sea',
        paragraph: 'Just like people grow tomato seedlings in a greenhouse before planting them in a garden, marine scientists grow baby corals on small underwater frames.'
      },
      {
        heading: 'Moving Them to Their Forever Home',
        paragraph: 'Once the corals grow strong, scuba divers swim down with special non-toxic ocean glue. They attach the little corals onto rocks. Within months, the coral branches grow big and colorful.'
      },
      {
        heading: 'Sea Creatures Come Home',
        paragraph: 'As soon as corals settle in, baby fish, bright yellow tangs, and sea turtles come back to eat algae and sleep safely in between the coral branches.'
      }
    ],
    wordsToKnow: [
      {
        word: 'Coral Reef',
        pronunciation: 'KOR-ul REEF',
        simpleMeaning: 'An underwater home made of stony skeletons built by tiny sea animals.',
        exampleSentence: 'The Great Barrier Reef is so large it can be seen from space.'
      },
      {
        word: 'Marine Biologist',
        pronunciation: 'muh-REEN by-OL-uh-jist',
        simpleMeaning: 'A scientist who studies plants and animals living in the ocean.',
        exampleSentence: 'The marine biologist studied how dolphins talk to each other.'
      },
      {
        word: 'Ecosystem',
        pronunciation: 'EE-koh-sis-tum',
        simpleMeaning: 'A community of living plants, animals, and their environment working together.',
        exampleSentence: 'A healthy forest is an ecosystem where trees, deer, and birds help each other.'
      }
    ]
  },
  {
    id: 'school-gardens-food',
    title: 'More Schools Are Starting Vegetable Gardens for Healthy Lunches',
    simpleTitle: 'Kids Are Growing Fresh Carrots and Strawberries at School',
    category: 'Life',
    categoryLabel: 'School & Food',
    categoryIcon: 'Apple',
    date: 'Sep 14, 2026',
    readTime: '2 min read',
    imageUrl: '/images/school_garden_food_1790144557678.jpg',
    imageCaption: 'Fresh garden vegetables harvested with rich soil and green leaves.',
    featured: false,
    shortSnippet: 'Elementary and middle schools around the country are turning unused patches of grass into lively garden beds.',
    superSimpleSnippet: 'Students are planting seeds, watering sprouts, and eating crunchy salads they grew with their own hands!',
    takeaways: [
      'Students learn science outdoors by testing soil and watching seeds grow.',
      'Vegetables grown by students are served fresh in the school cafeteria.',
      'Kids report that eating food they grew themselves tastes twice as good.'
    ],
    whyItMatters: 'Learning where our food comes from encourages healthy habits, saves money, and connects us with nature.',
    sections: [
      {
        heading: 'Classrooms Without Walls',
        paragraph: 'Instead of only reading about plants inside science textbooks, thousands of students now step outside with garden trowels and watering cans every week.'
      },
      {
        heading: 'From Seed to Lunch Tray',
        paragraph: 'Children plant seeds of sweet carrots, crisp lettuce, red radishes, and bright strawberries. Teachers use the garden to teach math by measuring plant growth, and science by studying earthworms.'
      },
      {
        heading: 'Cafeteria Celebrations',
        paragraph: 'On harvest day, the kitchen staff washes the fresh produce and adds it to the lunch salad bar. Children are excited to eat greens because they watched them sprout from tiny seeds.'
      }
    ],
    wordsToKnow: [
      {
        word: 'Harvest',
        pronunciation: 'HAR-vist',
        simpleMeaning: 'The time or act of picking ripe vegetables, fruits, or grains from plants.',
        exampleSentence: 'Autumn is the harvest season for juicy apples and orange pumpkins.'
      },
      {
        word: 'Nutrition',
        pronunciation: 'noo-TRISH-un',
        simpleMeaning: 'The healthy vitamins and energy your body gets from the food you eat.',
        exampleSentence: 'Carrots and oranges are packed with great nutrition for your body.'
      }
    ]
  },
  {
    id: 'world-cycling-cities',
    title: 'Cities Build Bright Green Bike Highways to Reduce Car Traffic',
    simpleTitle: 'Cities Make Safe Green Paths So People Can Bike Everywhere',
    category: 'World',
    categoryLabel: 'World & Cities',
    categoryIcon: 'Globe',
    date: 'Sep 13, 2026',
    readTime: '2 min read',
    imageUrl: '/images/city_bike_paths_1790144491990.jpg',
    imageCaption: 'People riding bicycles down a wide, scenic lane separated from cars.',
    featured: false,
    shortSnippet: 'Major cities are creating protected lanes with green paint and concrete borders so families can cycle safely.',
    superSimpleSnippet: 'Big cities are building wide paths just for bikes, scooters, and strollers. It makes streets quiet, clean, and fun.',
    takeaways: [
      'Protected bike lanes separate riders from cars with curbs and plants.',
      'Air in downtown districts has become cleaner since more people leave cars at home.',
      'Commuters get daily exercise while avoiding traffic jams and parking fees.'
    ],
    whyItMatters: 'When streets are safe for everyone, kids can bike to school, neighborhoods become quieter, and cities produce less smog.',
    sections: [
      {
        heading: 'Why Do We Need Bike Paths?',
        paragraph: 'For a long time, city roads were built only with cars in mind. Riding a bicycle in traffic felt scary for many people. Now, planners are designing separated lanes where cars cannot enter.'
      },
      {
        heading: 'Safer and Quieter Streets',
        paragraph: 'These new lanes are painted bright green and have little gardens or low stone curbs separating them from big trucks and buses. This keeps cyclists, scooters, and skateboarders completely safe.'
      },
      {
        heading: 'Better Health and Fresh Air',
        paragraph: 'Doctors say riding a bicycle for twenty minutes a day keeps your heart strong and lowers stress. Plus, bicycles do not use gasoline, so every bike on the road is a win for clean air.'
      }
    ],
    wordsToKnow: [
      {
        word: 'Commute',
        pronunciation: 'kuh-MYOOT',
        simpleMeaning: 'The regular trip a person makes between their home and their job or school.',
        exampleSentence: 'Her morning commute takes 15 minutes on her blue bicycle.'
      },
      {
        word: 'Infrastructure',
        pronunciation: 'IN-fruh-struhk-cher',
        simpleMeaning: 'The basic physical things a city needs to work, like roads, bridges, pipes, and tracks.',
        exampleSentence: 'Good bridges and smooth roads are important parts of city infrastructure.'
      }
    ]
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Headline',
    category: 'News Basics',
    simpleDefinition: 'The large title at the very top of a news article that tells you the main event.',
    example: '“Astronauts Return Safely To Earth” is an example of an exciting headline.'
  },
  {
    term: 'Source',
    category: 'News Basics',
    simpleDefinition: 'The person, document, or organization where the reporter learned the facts.',
    example: 'The reporter spoke to NASA as a trusted source for the moon rocket story.'
  },
  {
    term: 'Fact vs. Opinion',
    category: 'Critical Reading',
    simpleDefinition: 'A fact is something proven to be true. An opinion is what someone personally thinks or feels.',
    example: '“Water freezes at 32°F” is a fact. “Ice cream is the best dessert” is an opinion.'
  },
  {
    term: 'Interview',
    category: 'Journalism',
    simpleDefinition: 'A conversation where a reporter asks someone questions to learn what happened.',
    example: 'The journalist held an interview with the city mayor about new parks.'
  },
  {
    term: 'Climate',
    category: 'Environment',
    simpleDefinition: 'The usual weather pattern in a place over many years (like rainy, dry, or cold).',
    example: 'Deserts have a very dry and sunny climate.'
  },
  {
    term: 'Innovation',
    category: 'Technology',
    simpleDefinition: 'A brand-new invention or a much better way of doing something.',
    example: 'Electric school buses are an innovation that keeps air clean.'
  }
];
