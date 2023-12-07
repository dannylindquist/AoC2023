function isDigit(text: string) {
  return !Number.isNaN(parseInt(text, 10));
}

function gatherDigits(line: string): number {
  let current = "";
  for (const char of line) {
    if (isDigit(char)) {
      current += char;
    }
  }
  return +current;
}

function getRecordHoldTimes(distance: number, totalTime: number) {
  let opt1 = (totalTime - Math.sqrt(Math.pow(totalTime, 2) - 4 * distance)) / 2;
  if (Number.isInteger(opt1)) {
    opt1++;
  }
  let opt2 = (totalTime + Math.sqrt(Math.pow(totalTime, 2) - 4 * distance)) / 2;
  if (Number.isInteger(opt2)) {
    opt2--;
  }
  return [Math.ceil(opt1), Math.floor(opt2)] as const;
}

function processData(data: string) {
  const lines = data.split("\n");
  const time = gatherDigits(lines[0]);
  const distance = gatherDigits(lines[1]);
  const recordHoldTimes = getRecordHoldTimes(distance, time);
  return recordHoldTimes[1] - recordHoldTimes[0] + 1;
}

// control test
console.log(
  processData(`Time:      7  15   30
Distance:  9  40  200`)
);

// my data
console.log(
  processData(`Time:        54     81     70     88
  Distance:   446   1292   1035   1007`)
);
