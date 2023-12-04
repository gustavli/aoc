import run from "aocrunner";

type Card = {
  winning: number[];
  yourNumbers: number[];
  copies: number;
}


const parseInput = (rawInput: string): Card[] => {
  var gamesInput = rawInput.split("\n");

  var cards: Card[] = gamesInput.map(line => {
    const game = line.split(":")[1].split("|")

    const winning = game[0].split(" ").filter(s => s !== "").map(Number);
    const yours = game[1].split(" ").filter(s => s !== "").map(Number)

    return { winning: winning, yourNumbers: yours, copies: 1 }
  })

  return cards
};

const part1 = (rawInput: string) => {
  const start = performance.now()
  const cards = parseInput(rawInput);
  const end = performance.now()

  var points = 0;

  cards.forEach((card, idx) => {
    var common = card.yourNumbers.filter(num => card.winning.includes(num)).length
    points += common > 0 ? Math.pow(2, common - 1) : 0
  })

  return points;
};

const part2 = (rawInput: string): number => {
  const cards = parseInput(rawInput);

  var wonCards = 0;

  cards.forEach((card, idx) => {
    var matchingNumbers = card.yourNumbers.filter(num => card.winning.includes(num)).length
    cards.slice(idx + 1, idx + matchingNumbers + 1).forEach(card2 => {
      card2.copies += card.copies;
    })

    wonCards += card.copies
  })

  return wonCards;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
