import run from "aocrunner";

type RangeMap = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};

const parseInput = (rawInput: string) => {
  var seeds: number[] = [];
  var seedToSoilMap: RangeMap[] = [];
  var soilToFertilizerMap: RangeMap[] = [];
  var fertilizerToWaterMap: RangeMap[] = [];
  var waterToLightMap: RangeMap[] = [];
  var lightToTemperatureMap: RangeMap[] = [];
  var temperatureToHumidityMap: RangeMap[] = [];
  var humidityToLocationMap: RangeMap[] = [];
  var stepMap: RangeMap[][] = [];

  var sections = rawInput.split("\n\n").map((line) => line.split(":")[1]);

  //read seed map
  seeds = sections[0].trim().split(" ").map(Number);

  console.log(seeds);
  return [seeds, stepMap];
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

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
        input: `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
        `,
        expected: 35,
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
