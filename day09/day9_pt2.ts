function calculateDifference(digits: number[]): number {
  const diffs: number[][] = [digits];
  let currentDigits = digits;
  while (!diffs.at(-1)?.every((entry) => entry === 0)) {
    const currentDiffs = [];
    for (let i = 1; i < currentDigits.length; i++) {
      currentDiffs.push(currentDigits[i] - currentDigits[i - 1]);
    }
    currentDigits = currentDiffs;
    diffs.push(currentDiffs);
  }
  diffs.reverse();
  let number = 0;
  for (const items of diffs) {
    number = items[0]! - number;
  }
  return number;
}

function processData(data: string) {
  const lines = data.split("\n");
  let diffTotal = 0;
  for (const line of lines) {
    diffTotal += calculateDifference(line.split(" ").map(Number));
  }
  return diffTotal;
}

console.log(
  processData(`0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`)
);

console.log(processData(await Bun.file("./day09/text.txt").text()));
