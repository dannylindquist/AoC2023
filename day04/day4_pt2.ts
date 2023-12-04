const matcher = /(?<value>\d+)|(?<separator>\|)/g;
function processContent(data: string) {
  const cards: Record<string, number> = {};
  for (const line of data.split("\n")) {
    let match;
    let first = true;
    let winners = new Set();
    let mode = "winners";
    let totalWinners = 0;
    let cardId = 0;
    while ((match = matcher.exec(line))) {
      if (first) {
        const colon = line.indexOf(":");
        cardId = +line.substring(5, colon);
        if (!cards[cardId]) {
          cards[cardId] = 0;
        }
        cards[cardId] += 1;
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
          totalWinners++;
        }
      }
    }
    const increaseAmount = cards[cardId];
    for (let i = cardId + 1; i <= cardId + totalWinners; i++) {
      cards[i] = cards[i] ? cards[i] + increaseAmount : increaseAmount;
    }
  }
  return Object.values(cards).reduce((agg, val) => agg + val);
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
