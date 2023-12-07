import run from "aocrunner";

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];

type Hand = {
  cards: typeof cards;
  bet: number;
};

const parseInput = (rawInput: string): Hand[] => {
  var hands: Hand[] = [];
  rawInput.split("\n").map((line) => {
    var [cards, bet] = line.split(" ");

    const hand: Hand = {
      bet: Number(bet),
      cards: cards.split(""),
    };
    hands.push(hand);
  });

  return hands;
};

const part1 = (rawInput: string) => {
  const hands = parseInput(rawInput);
  console.log(hands);

  return;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
