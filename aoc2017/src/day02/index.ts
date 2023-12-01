import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  console.log(lines.length + " lines");

  var sum = 0;
  lines.forEach((line) => {
    var values = line.split("\t").map(Number);
    var min = values.reduce((previousValue, currentValue) => {
      return Math.min(previousValue, currentValue);
    });
    var max = values.reduce((previousValue, currentValue) => {
      return Math.max(previousValue, currentValue);
    });

    values.forEach((value) => {
      if (min === -1 || value < min) min = value;
      if (max === -1 || value > max) max = value;
    });
    sum += max - min;
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const lines = input.split("\n");
  console.log(lines.length + " lines");

  var sum = 0;
  lines.forEach((line) => {
    var values = line.split("\t").map(Number);

    var div: number = 0;
    values.forEach((val, idx) => {
      var next = values[idx + 1];
      if ((val / next) % 2 === 0) {
        div = val / next;
        return;
      } else if ((next / val) % 2 === 0) {
        div = next / val;
        return;
      }
    });

    sum += div;
  });

  return sum;
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
