import run from "aocrunner";

type Race = {
  time: number;
  recordDistance: number;
}

const parseInputPart1 = (rawInput: string): Race[] => {
  var [times, distances] = rawInput.split("\n").map(line => line.split(":")[1].trim().split(/\s+/).map(Number))
  if (times.length !== distances.length) throw new Error("parsing failed")

  var races: Race[] = times.map((time, idx) => {
    return {
      time: time,
      recordDistance: distances[idx]
    }
  })
  return races;
};

const parseInputPart2 = (rawInput: string): Race => {
  var [time, distance] = rawInput.split("\n").map(line => line.split(":")[1].trim().replace(/\s/g, "")).map(Number)

  return { time: time, recordDistance: distance }
};

const caluclateDistance = (speed: number, time: number) => speed * time

const part1 = (rawInput: string) => {
  const races: Race[] = parseInputPart1(rawInput);

  var waysToWinPerRace: number[] = Array(races.length).fill(0)

  races.forEach((race, idx) => {
    [...Array(race.time + 1).keys()].forEach(windUpTime => {
      const distance = caluclateDistance(windUpTime, race.time - windUpTime)
      if (distance > race.recordDistance) waysToWinPerRace[idx]++
    });
  })

  return waysToWinPerRace.reduce((prev, cur) => prev * cur, 1)
};

const part2 = (rawInput: string) => {
  const race: Race = parseInputPart2(rawInput);

  var waysToWin: number = 0;

  [...Array(race.time + 1).keys()].forEach(windUpTime => {
    const distance = caluclateDistance(windUpTime, race.time - windUpTime)
    if (distance > race.recordDistance) waysToWin++
  });

  return waysToWin;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30
Distance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
