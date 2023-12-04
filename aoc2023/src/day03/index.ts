import run from "aocrunner";

type Position = {
  x: number;
  y: number;
};

type Number = {
  position: Position;
  number: number;
};
type Sign = {
  sign: string;
  position: Position;
};

const parseInput = (rawInput: string): [Number[], Sign[]] => {
  var numbers = new Array<Number>();
  var signs = new Array<Sign>();

  rawInput.split("\n").forEach((line) => {
    const lineNumbers = line.matchAll(new RegExp("(\\d+)", "g"));
    for (const match of lineNumbers) {
      console.log(match);
    }
  });

  return [numbers, signs];
};

const part1 = (rawInput: string): number => {
  const [numbers, signs] = parseInput(rawInput);
  console.log(numbers);
  console.log(signs);

  return 0;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
