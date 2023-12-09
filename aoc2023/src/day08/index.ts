import run from "aocrunner";

enum Direction {
  Left = "L",
  Right = "R",
}

type Node = {
  id: string;
  left: string;
  right: string;
};

const parseInput = (rawInput: string): [Direction[], Node[]] => {
  const directions: Direction[] = rawInput
    .split("\n")[0]
    .split("")
    .map((c) => c as Direction);

  const nodes: Node[] = rawInput
    .split("\n")
    .splice(2)
    .map((line) => {
      const matches = [...line.matchAll(new RegExp("([A-Z1-9]{3})", "g"))];
      return {
        id: matches[0][0],
        left: matches[1][0],
        right: matches[2][0],
      };
    });

  return [directions, nodes];
};

const part1 = (rawInput: string) => {
  const [directions, nodes] = parseInput(rawInput);

  const nodeMap: Map<string, Node> = new Map();
  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
  });

  const endNode = nodeMap.get("ZZZ")!;
  var curNode = nodeMap.get("AAA")!;
  var steps = 0;

  while (curNode.id !== endNode.id) {
    const i = steps % directions.length;
    const direction = directions[i];
    if (direction === Direction.Left) {
      curNode = nodeMap.get(curNode.left)!;
    } else {
      curNode = nodeMap.get(curNode.right)!;
    }
    steps++;
  }

  return steps;
};

const part2 = (rawInput: string) => {
  const [directions, nodes] = parseInput(rawInput);
  const nodeMap: Map<string, Node> = new Map();
  nodes.forEach((node) => {
    nodeMap.set(node.id, node);
  });

  var nodesStartingWithA: Node[] = nodes.filter((node) =>
    node.id.endsWith("A"),
  );

  var nominators = nodesStartingWithA.map((node) => {
    var curNode = node;
    var steps = 0;

    while (!curNode.id.endsWith("Z")) {
      const i = steps % directions.length;
      const direction = directions[i];
      if (direction === Direction.Left) {
        curNode = nodeMap.get(curNode.left)!;
      } else {
        curNode = nodeMap.get(curNode.right)!;
      }
      steps++;
    }
    return steps;
  });

  console.log(nominators);

  //TODO: RETURN LCM
  return 0;
};

run({
  part1: {
    tests: [
      {
        input: `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
