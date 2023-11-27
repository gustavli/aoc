import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const chararray = input.split("");
  const step = 1;

  var result = 0;
  chararray.forEach((val, idx) => {
    if (val === chararray[(idx + 1) % chararray.length])
      result += parseInt(val);
  });

  return result;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const chararray = input.split("");
  const step = chararray.length / 2;

  var result = 0;
  chararray.forEach((val, idx) => {
    if (val === chararray[(idx + step) % chararray.length])
      result += parseInt(val);
  });

  return result;
};

run({
  part1: {
    tests: [
      {
        input: "1122",
        expected: 3,
      },
      {
        input: "1111",
        expected: 4,
      },
      {
        input: "1234",
        expected: 0,
      },
      {
        input: "91212129",
        expected: 9,
      },
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: "1212",
        expected: 6,
      },
      {
        input: "1221",
        expected: 0,
      },
      {
        input: "123425",
        expected: 4,
      },
      {
        input: "123123",
        expected: 12,
      },
      {
        input: "12131415",
        expected: 4,
      },
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
