import run from "aocrunner";

type GameCube = {
  color: string;
  count: number;
};
type Game = {
  cubes: GameCube[];
};

const parseInput = (rawInput: string) => {
  const cubes = rawInput
    .split("\n")
    .map((s) => s.replace(new RegExp("Game\\s\\d:\\s"), ""));
  return cubes;
};

type GameStats = {
  red: number;
  blue: number;
  green: number;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  var legalCubeGamesScore = 0;

  const MAX_RED = 12;
  const MAX_GREEN = 13;
  const MAX_BLUE = 14;

  input.forEach((game, idx) => {
    var gameStats: GameStats = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const cubes = [
      ...game.matchAll(new RegExp("(\\d+\\s{1}(?:blue|red|green))", "g")),
    ];

    cubes.forEach((cube) => {
      const number = Number(cube[0].split(" ")[0]);
      const color = cube[0].split(" ")[1];
      switch (color) {
        case "red":
          gameStats.red = gameStats.red < number ? number : gameStats.red;
          break;
        case "blue":
          gameStats.blue = gameStats.blue < number ? number : gameStats.blue;
          break;
        case "green":
          gameStats.green = gameStats.green < number ? number : gameStats.green;
          break;
        default:
          throw new Error("Invalid color");
      }
    });

    if (
      gameStats.red <= MAX_RED &&
      gameStats.green <= MAX_GREEN &&
      gameStats.blue <= MAX_BLUE
    ) {
      legalCubeGamesScore += idx + 1;
    }
  });

  return legalCubeGamesScore;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  var powerSum = 0;

  input.forEach((game) => {
    var gameStats: GameStats = {
      red: 0,
      green: 0,
      blue: 0,
    };
    const cubes = [
      ...game.matchAll(new RegExp("(\\d+\\s{1}(?:blue|red|green))", "g")),
    ];

    cubes.forEach((cube) => {
      const number = Number(cube[0].split(" ")[0]);
      const color = cube[0].split(" ")[1];
      switch (color) {
        case "red":
          gameStats.red = gameStats.red < number ? number : gameStats.red;
          break;
        case "blue":
          gameStats.blue = gameStats.blue < number ? number : gameStats.blue;
          break;
        case "green":
          gameStats.green = gameStats.green < number ? number : gameStats.green;
          break;
        default:
          throw new Error("Invalid color");
      }
    });

    powerSum += gameStats.red * gameStats.blue * gameStats.green;
  });
  return powerSum;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
