import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  console.log(lines.length + " lines");

  var sum = 0;
  lines.forEach((line) => {
    var min = -1;
    var max = -1;

    var values = line.split("\t");
    console.log(values.length + " values");
    values.forEach((value) => {
      var val: number = parseInt(value);
      if (min === -1 || val < min) min = val;
      if (max === -1 || val > max) max = val;
    });
    sum += max - min;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  return;
};

run({
  part1: {
    tests: [],
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
  trimTestInputs: false,
  onlyTests: false,
});
