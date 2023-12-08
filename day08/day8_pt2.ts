const matcher =
  /(?<key>[A-Z0-9]{3}) = \((?<L>[A-Z0-9]{3}), (?<R>[A-Z0-9]{3})\)/g;
function processData(data: string) {
  const lines = data.split("\n");
  const instructions = lines[0].trim();

  const map: Record<string, { L: string; R: string }> = {};
  let match;
  while ((match = matcher.exec(data))) {
    map[match.groups!["key"]] = {
      L: match.groups!["L"],
      R: match.groups!["R"],
    };
  }
  let current = Object.keys(map).filter((node) => node.endsWith("A"));
  let stepsForNode: number[] = Array.from({ length: 6 }).fill(0);
  let steps = 0;
  while (!stepsForNode.every((node) => node > 0)) {
    const direction = instructions[steps % instructions.length];
    for (let i = 0; i < current.length; i++) {
      current[i] = map[current[i]][direction];
      if (current[i].endsWith("Z") && stepsForNode[i] === 0) {
        stepsForNode[i] = steps;
      }
    }
    steps++;
  }
  console.log(stepsForNode);
  return steps;
}

// control test
console.log(
  processData(`LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`)
);

// my data
//console.log(processData(await Bun.file("./day08/text.txt").text()));
