import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  var sum = 0;
  input.split("\n").forEach((line) => {
    var num = line.split("").filter((c) => !isNaN(Number(c)));

    var calibrationValue = Number("" + num[0] + num[num.length - 1]);
    sum += calibrationValue;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split("\n");
  const dict: any = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
  };
  var sum = 0;

  input.forEach((line) => {
    var keys = Object.keys(dict);
    const keyregex = new RegExp(keys.join("|") + "|\\d", "g");

    let match;
    var matches = new Array<number>();

    while ((match = keyregex.exec(line)) !== null) {
      keyregex.lastIndex = match.index + 1;
      matches.push(dict[match[0]] || match[0]);
    }

    var first = matches[0];
    var last = matches[matches.length - 1];

    var calibrationValue = Number("" + first + last);
    sum += calibrationValue;
    console.log(`Calibration value = ${calibrationValue} for string ${line}`);
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
