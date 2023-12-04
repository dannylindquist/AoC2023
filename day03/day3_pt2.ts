let matcher = /(?<symbol>\*)/g;
const adjacent = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
function processInformation(data: string) {
  let lineNumber = 0;
  let rows = data.split("\n");
  let total = 0;
  for (const line of rows) {
    let match: RegExpExecArray | null;
    while ((match = matcher.exec(line))) {
      const processed = new Set();
      const foundNumbers: number[] = [];
      adjacent.forEach((element) => {
        const row = element[0] + lineNumber;
        const column = element[1] + match!.index;
        const cellKey = `${row},${column}`;
        if (Number.isInteger(+rows[row][column]) && !processed.has(cellKey)) {
          processed.add(cellKey);
          let foundNumber = rows[row][column];
          let columnWalker = column;
          while (
            Number.isInteger(+rows[row][--columnWalker]) &&
            !processed.has(`${row},${columnWalker}`)
          ) {
            processed.add(`${row},${columnWalker}`);
            foundNumber = rows[row][columnWalker] + foundNumber;
          }
          columnWalker = column;
          while (
            Number.isInteger(+rows[row][++columnWalker]) &&
            !processed.has(`${row},${columnWalker}`)
          ) {
            processed.add(`${row},${columnWalker}`);
            foundNumber = foundNumber + rows[row][columnWalker];
          }
          foundNumbers.push(+foundNumber);
        }
      });
      if (foundNumbers.length === 2) {
        total += foundNumbers[0] * foundNumbers[1];
      }
    }
    matcher.lastIndex = 0;
    lineNumber++;
  }
  return total;
}

console.log(
  processInformation(`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`)
);

console.log(processInformation(await Bun.file("./day03/text.txt").text()));
