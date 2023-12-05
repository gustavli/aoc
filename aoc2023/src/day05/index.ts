import run from "aocrunner";

type RangeMap = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};

const parseInput = (rawInput: string): [number[], RangeMap[][]] => {
  var seeds: number[] = [];
  var stepMap: RangeMap[][] = [];

  var sections = rawInput.split("\n\n").map((line) => line.split(":")[1]);

  seeds = sections[0].trim().split(" ").map(Number);

  sections.splice(1).forEach((line, stepCount) => {
    let newmap: RangeMap[] = []
    stepMap[stepCount] = newmap;
    line.trim().split("\n").forEach(mapping => {
      const [destination, source, length] = mapping.split(" ").map(Number);
      stepMap[stepCount].push({
        destinationRangeStart: destination,
        sourceRangeStart: source,
        rangeLength: length
      })
    })
  })

  return [seeds, stepMap];
};

const findDestinationForSeed = (seed: number, stepMap: RangeMap[][]) => {
  stepMap.forEach((rangeMaps, idx) => {
    var match = rangeMaps.find(rangeMap => rangeMap.sourceRangeStart <= seed && rangeMap.sourceRangeStart + rangeMap.rangeLength - 1 >= seed)
    if (match !== undefined) {
      const diff = seed - match.sourceRangeStart
      seed = match.destinationRangeStart + diff
    }
  })
  return seed
}

const part1 = (rawInput: string) => {
  const [seeds, stepMap] = parseInput(rawInput);
  var destinations: number[] = [];

  seeds.forEach(seed => {
    destinations.push(findDestinationForSeed(seed, stepMap))
  })

  return Math.min(...destinations)
};

const part2 = (rawInput: string) => {
  const [seedInput, stepMap] = parseInput(rawInput);
  var lowest = -1

  var seedRanges = []
  for (var i = 0; i < seedInput.length; i += 2) {
    seedRanges.push(seedInput.slice(i, i + 2));
  }

  seedRanges.forEach((range, rangeidx) => {
    const startTime = performance.now()
    const [start, length] = range
    for (var seed = start; seed < start + length; seed++) {
      const destination = findDestinationForSeed(seed, stepMap);
      if (lowest == -1 || destination < lowest) lowest = destination
    }
    const endTime = performance.now()
    console.log(`checked ${rangeidx} of ${seedRanges.length} in ${endTime - startTime} ms`)
  })

  return lowest
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
    tests: [{
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
      expected: 46,
    },],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
