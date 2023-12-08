const matcher = /(?<key>[A-Z]{3}) = \((?<L>[A-Z]{3}), (?<R>[A-Z]{3})\)/g;
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
  let current = "AAA";
  let steps = 0;
  while (current !== "ZZZ") {
    const direction = instructions[steps % instructions.length];
    current = map[current][direction];
    steps++;
  }
  console.log(current, steps);
}

// control test
console.log(
  processData(`LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`)
);

// my data
console.log(processData(await Bun.file("./day08/text.txt").text()));
