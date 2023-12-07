function isDigit(text: string) {
  return !Number.isNaN(parseInt(text, 10));
}

function gatherDigits(line: string, startIndex: number): number {
  let current = "";
  for (let i = startIndex; i < line.length; i++) {
    const char = line[i];
    if (isDigit(char)) {
      current += char;
    }
  }
  return +current;
}

const handOrder = [
  "five",
  "four",
  "full-house",
  "three",
  "two-pair",
  "one-pair",
  "high-card",
] as const;

type HandType = (typeof handOrder)[number];

const cardOrder = {
  A: 0,
  K: 1,
  Q: 2,
  J: 3,
  T: 4,
  "9": 5,
  "8": 6,
  "7": 7,
  "6": 8,
  "5": 9,
  "4": 10,
  "3": 11,
  "2": 12,
};

function determineHand(hand: string): HandType {
  const groups: Record<string, number> = {};
  for (const card of hand) {
    groups[card] = groups[card] ? groups[card] + 1 : 1;
  }
  const values = Object.values(groups).sort((a, b) => b - a);
  if (values[0] === 5) {
    return "five";
  } else if (values[0] === 4) {
    return "four";
  } else if (values[0] === 3) {
    if (values[1] === 2) {
      return "full-house";
    }
    return "three";
  } else if (values[0] === 2) {
    if (values[1] === 2) {
      return "two-pair";
    }
    return "one-pair";
  }
  return "high-card";
}

function handSorter(
  { hand: hand1 }: { hand: string },
  { hand: hand2 }: { hand: string }
) {
  for (let i = 0; i < hand1.length; i++) {
    if (cardOrder[hand1[i]] === cardOrder[hand2[i]]) {
      continue;
    }
    return cardOrder[hand1[i]] - cardOrder[hand2[i]];
  }
  return 0;
}

function processData(data: string) {
  const lines = data.split("\n");
  const hands: Record<HandType, { hand: string; bid: number }[]> = {};
  for (const line of lines) {
    const hand = line.substring(0, 5);
    const bid = gatherDigits(line, 6);
    const handType = determineHand(hand);
    if (!hands[handType]) {
      hands[handType] = [];
    }
    hands[handType].push({ hand, bid });
  }
  const winnerList = [];
  let scoreModifier = lines.length + 1;
  for (const type of handOrder) {
    if (hands[type]) {
      const handsToProcess = hands[type];
      const sorted = handsToProcess.sort(handSorter);
      let previousHand = "";
      for (const hand of sorted) {
        scoreModifier--;
        winnerList.push({ ...hand, type, scoreModifier });
        // if (hand.hand === previousHand) {
        //   winnerList.push({ ...hand, type, scoreModifier });
        // } else {
        //   previousHand = hand.hand;
        //   scoreModifier -= 1;
        //   winnerList.push({ ...hand, type, scoreModifier });
        // }
      }
    }
  }
  return winnerList.reduce((agg, val, index) => {
    return agg + val.bid * val.scoreModifier;
  }, 0);
}

// control test
console.log(
  processData(`32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`)
);

// my data
console.log(processData(await Bun.file("./day07/text.txt").text()));
