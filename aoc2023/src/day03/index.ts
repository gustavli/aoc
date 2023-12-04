import run from "aocrunner";

type Position = {
  xStart: number;
  xEnd: number;
  y: number;
};

type PartNumber = {
  position: Position;
  number: number;
};
type Sign = {
  sign: string;
  position: Position;
};

const parseInput = (rawInput: string): [PartNumber[], Sign[]] => {
  var numbers = new Array<PartNumber>();
  var signs = new Array<Sign>();

  rawInput.split("\n").forEach((line, idx) => {
    const lineNumbers = line.matchAll(new RegExp("(\\d+)", "g"));
    for (const match of lineNumbers) {
      const num: PartNumber = {
        number: Number(match[0]),
        position: {
          xStart: match.index!,
          xEnd: match.index! + match[0].length - 1,
          y: idx
        }
      }
      numbers.push(num)
    }
  });
  rawInput.split("\n").forEach((line, idx) => {
    const lineNumbers = line.matchAll(new RegExp("([^A-Za-z0-9.\n])", "g"));
    for (const match of lineNumbers) {
      const sign: Sign = {
        sign: match[0],
        position: {
          xStart: match.index!,
          xEnd: match.index! + match[0].length - 1,
          y: idx
        }
      }
      signs.push(sign)
    }
  });
  return [numbers, signs];
};

const hasAdjacentSign = (partNumber: PartNumber, signs: Sign[]): boolean => {

  if (signs.some(sign =>
    (sign.position.y <= partNumber.position.y + 1)
    && (sign.position.y >= partNumber.position.y - 1)
    && (sign.position.xStart >= partNumber.position.xStart - 1)
    && (sign.position.xEnd <= partNumber.position.xEnd + 1)
  )) return true

  return false
}

const findAdjacentNumbers = (sign: Sign, partNumbers: PartNumber[]): PartNumber[] | null => {


  var adjacent = partNumbers.filter(partNumber =>
    (sign.position.y <= partNumber.position.y + 1)
    && (sign.position.y >= partNumber.position.y - 1)
    && (sign.position.xStart >= partNumber.position.xStart - 1)
    && (sign.position.xEnd <= partNumber.position.xEnd + 1)
  )

  return adjacent.length === 2 ? adjacent : null

}

const part1 = (rawInput: string): number => {
  const [numbers, signs] = parseInput(rawInput);

  var sum = 0;

  numbers.forEach(num => {
    if (hasAdjacentSign(num, signs)) sum += num.number;
  })

  return sum;
};

const part2 = (rawInput: string) => {
  const [numbers, signs] = parseInput(rawInput);

  var sum = 0;

  signs.filter(sign => sign.sign === "*").forEach(sign => {
    const adjacent = findAdjacentNumbers(sign, numbers);
    if (adjacent !== null) sum += adjacent[0].number * adjacent[1].number
  })

  return sum;
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
        expected: 467835
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
