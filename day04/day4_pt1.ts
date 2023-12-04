const matcher = /(?<value>\d+)|(?<separator>\|)/g;
function processContent(data: string) {
  let total = 0;
  for (const line of data.split("\n")) {
    let match;
    let first = true;
    let winners = new Set();
    let mode = "winners";
    let cardTotal = 0;
    while ((match = matcher.exec(line))) {
      if (first) {
        first = false;
        continue;
      }
      if (match.groups!["separator"]) {
        mode = "holding";
      } else {
        const value = +match[0];
        if (mode === "winners") {
          winners.add(value);
        } else if (winners.has(value)) {
          cardTotal = cardTotal === 0 ? 1 : cardTotal * 2;
        }
      }
    }
    total += cardTotal;
  }
  return total;
}

console.log(
  processContent(`Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`)
);

console.log(processContent(await Bun.file("./day04/text.txt").text()));
