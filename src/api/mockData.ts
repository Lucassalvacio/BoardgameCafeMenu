import type { MenuCategory, BoardGame } from '../types';

// This mirrors exactly what the REST endpoints (GET /menu, GET /games) are
// expected to return. Used as a fallback when no backend is reachable yet,
// so the UI is fully demoable before you stand up Firebase / a real API.

export const mockMenu: MenuCategory[] = [
  {
    category: 'Coffee',
    items: [
      { id: 'c1', name: 'Espresso', desc: 'Single shot, dark and concentrated.', price: 18000 },
      { id: 'c2', name: 'Americano', desc: 'Espresso lengthened with hot water.', price: 20000 },
      { id: 'c3', name: 'Cappuccino', desc: 'Espresso, steamed milk, thick foam.', price: 25000 },
      { id: 'c4', name: 'Café Latte', desc: 'Espresso with extra steamed milk, light foam.', price: 25000 },
      { id: 'c5', name: 'Iced Palm Sugar Coffee', desc: 'Espresso, milk, gula aren, over ice.', price: 27000 },
      { id: 'c6', name: 'Affogato', desc: 'Vanilla ice cream drowned in hot espresso.', price: 30000 },
    ],
  },
  {
    category: 'Tea',
    items: [
      { id: 't1', name: 'Lemon Tea', desc: 'Black tea, fresh lemon, served hot or iced.', price: 18000 },
      { id: 't2', name: 'Thai Tea', desc: 'Strong black tea, condensed milk, over ice.', price: 22000 },
      { id: 't3', name: 'Chamomile Tea', desc: 'Caffeine-free, calming herbal blend.', price: 18000 },
      { id: 't4', name: 'Jasmine Tea', desc: 'Lightly fragrant green tea, served hot.', price: 18000 },
    ],
  },
  {
    category: 'Indomie & Noodles',
    items: [
      { id: 'n1', name: 'Indomie Goreng', desc: 'Classic fried instant noodles, fried egg on top.', price: 20000 },
      { id: 'n2', name: 'Indomie Goreng Special', desc: 'Loaded with cheese, sausage, and egg.', price: 28000 },
      { id: 'n3', name: 'Indomie Kuah Seafood', desc: 'Soup noodles with shrimp, fish cake, and scallion.', price: 27000 },
      { id: 'n4', name: 'Mie Aceh Simple', desc: 'Stir-fried spiced noodles, shredded chicken, fried shallot.', price: 30000 },
    ],
  },
  {
    category: 'Snacks',
    items: [
      { id: 'sk1', name: 'French Fries', desc: 'Crispy classic fries, house seasoning salt.', price: 22000 },
      { id: 'sk2', name: 'Loaded Fries', desc: 'Fries topped with melted cheese and beef sausage bits.', price: 32000 },
      { id: 'sk3', name: 'Chicken Wings (6pc)', desc: 'Deep-fried wings tossed in spicy soy glaze.', price: 35000 },
      { id: 'sk4', name: 'Nachos & Cheese Dip', desc: 'Tortilla chips, warm cheese dip, jalapeño.', price: 30000 },
      { id: 'sk5', name: 'Popcorn (Salted / Caramel)', desc: 'A big bowl, easy to share over a game.', price: 18000 },
      { id: 'sk6', name: 'Onion Rings', desc: 'Crispy battered onion rings, BBQ dip.', price: 24000 },
    ],
  },
  {
    category: 'Café Bites',
    items: [
      { id: 'b1', name: 'Cheese Toast', desc: 'Grilled thick toast, double melted cheese.', price: 22000 },
      { id: 'b2', name: 'Club Sandwich', desc: 'Chicken, egg, lettuce, tomato, triple-stacked.', price: 32000 },
      { id: 'b3', name: 'Butter Croissant', desc: 'Flaky croissant, served warm.', price: 20000 },
      { id: 'b4', name: 'Banana Pancake', desc: 'Fluffy pancake stack, banana, maple syrup.', price: 28000 },
      { id: 'b5', name: 'Pisang Goreng', desc: 'Fried banana fritters, chocolate or cheese drizzle.', price: 20000 },
    ],
  },
  {
    category: 'Other Drinks',
    items: [
      { id: 'o1', name: 'Soft Drink', desc: 'Coke, Sprite, or Fanta, 330ml can.', price: 15000 },
      { id: 'o2', name: 'Fresh Lemonade', desc: 'House-made lemonade with mint.', price: 20000 },
      { id: 'o3', name: 'Mineral Water', desc: '600ml bottle.', price: 10000 },
    ],
  },
];

export const mockGames: BoardGame[] = [
  {
    id: 'gm1', name: 'Uno', players: '2–10', time: '15–30 min', difficulty: 'Easy',
    desc: 'A fast card-matching game by color and number, with action cards that reverse turns, skip players, or force a draw.',
    manualSteps: [
      'Deal 7 cards to each player; the rest forms a draw pile, with one card flipped to start the discard pile.',
      'On your turn, play a card that matches the top card by color or number, or play a wild card.',
      'Special cards (Skip, Reverse, Draw Two, Wild Draw Four) change turn order or force opponents to draw cards.',
      'Call "Uno" when you play your second-to-last card. The first player to empty their hand wins the round.',
    ],
  },
  {
    id: 'gm2', name: 'Monopoly', players: '2–6', time: '60–120 min', difficulty: 'Medium',
    desc: 'A property-trading classic. Buy streets, build houses and hotels, and try to bankrupt the other players.',
    manualSteps: [
      'Players take turns rolling dice and moving around the board, buying unowned properties they land on.',
      'Landing on an owned property means paying rent to its owner, which increases with houses and hotels.',
      'Collect a full color set to build houses, then upgrade to hotels for higher rent.',
      'Players who run out of money are eliminated; the last player remaining wins.',
    ],
  },
  {
    id: 'gm3', name: 'Catan', players: '3–4', time: '60–90 min', difficulty: 'Medium',
    desc: 'A resource-trading and settlement-building game on a modular hexagonal island.',
    manualSteps: [
      'Each turn, dice are rolled to determine which hexes produce resources for adjacent settlements.',
      'Use resources to build roads, settlements, and cities, or trade with other players and the bank.',
      'Settlements and cities earn victory points, as do certain development cards and achievements.',
      'The first player to reach 10 victory points wins the game.',
    ],
  },
  {
    id: 'gm4', name: 'Codenames', players: '4–8', time: '15–30 min', difficulty: 'Easy',
    desc: 'A team word-association game where spymasters give one-word clues to help teammates guess their agents.',
    manualSteps: [
      'Split into two teams, each with a spymaster who can see a hidden key to 25 word cards on the table.',
      'The spymaster gives a one-word clue and a number, hinting at multiple words belonging to their team.',
      'Teammates discuss and point to words they think match the clue, revealing what they are.',
      "A team wins by correctly identifying all of their agents first, while avoiding the opposing team's words and the assassin card.",
    ],
  },
  {
    id: 'gm5', name: 'Werewolf', players: '6–18', time: '20–40 min', difficulty: 'Medium',
    desc: "A social deduction party game where villagers try to identify hidden werewolves before it's too late.",
    manualSteps: [
      'A moderator secretly assigns roles such as Werewolf, Villager, and Seer, often using cards.',
      'During the "night" phase, players close their eyes while werewolves silently choose a victim.',
      'During the "day" phase, everyone discusses and votes to eliminate one suspected werewolf.',
      'Villagers win by eliminating all werewolves; werewolves win if they equal or outnumber the villagers.',
    ],
  },
  {
    id: 'gm6', name: 'Jenga', players: '1+', time: '10–20 min', difficulty: 'Easy',
    desc: 'A physical balance game where players remove wooden blocks from a tower and stack them on top.',
    manualSteps: [
      'Build the tower by stacking 54 wooden blocks in alternating layers of three.',
      'On your turn, remove one block from anywhere below the top complete layer, using only one hand.',
      'Place the removed block on top of the tower to extend it.',
      'A player loses if the tower falls or noticeably shifts during their turn.',
    ],
  },
  {
    id: 'gm7', name: 'Dixit', players: '3–6', time: '30 min', difficulty: 'Easy',
    desc: 'A storytelling card game with dreamlike illustrations, guessing whose card matches a given clue.',
    manualSteps: [
      'Each round, one player (the storyteller) picks a card and gives a word, phrase, or sound describing it without showing it.',
      'Other players each submit a card from their hand that could also fit the clue.',
      "All submitted cards are shuffled and revealed; players vote on which one was the storyteller's.",
      'Points are scored based on how many players guess correctly, rewarding clues that are neither too obvious nor too obscure.',
    ],
  },
  {
    id: 'gm8', name: 'Splendor', players: '2–4', time: '30 min', difficulty: 'Medium',
    desc: 'A gem-collecting engine-building game where players acquire mines and merchants to attract nobles.',
    manualSteps: [
      'Collect gem tokens and use them to purchase development cards, which provide permanent gem bonuses.',
      'Cheaper cards make later, more expensive cards easier to afford, creating a snowball effect.',
      'Accumulate enough permanent bonuses to attract noble tiles, which award bonus points.',
      'The first player to reach 15 points triggers the final round; the highest score after that wins.',
    ],
  },
  {
    id: 'gm9', name: 'Carcassonne', players: '2–5', time: '35–45 min', difficulty: 'Medium',
    desc: 'A tile-laying game where players build a medieval landscape of cities, roads, and fields.',
    manualSteps: [
      'On your turn, draw and place a tile so its edges connect logically to tiles already on the board.',
      'Optionally place one of your meeples on the new tile to claim a city, road, field, or monastery.',
      'Completed features score points immediately and return the meeple to your hand.',
      'At the end of the game, incomplete features are scored at reduced value; the highest total wins.',
    ],
  },
  {
    id: 'gm10', name: 'Exploding Kittens', players: '2–5', time: '15 min', difficulty: 'Easy',
    desc: "A quick, silly card game of bluffing and luck, where drawing the wrong card can end your game.",
    manualSteps: [
      'Players take turns drawing cards, trying to avoid drawing an Exploding Kitten card.',
      'Action cards let you skip your turn, peek at the deck, or force another player to draw twice.',
      'A Defuse card lets you survive an Exploding Kitten by secretly placing it back in the deck.',
      'Players are eliminated if they draw an Exploding Kitten without a Defuse card; the last player remaining wins.',
    ],
  },
];
