let matcher = /(?<symbol>[^.\w\s\d])/g;
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
  let partNumbers: number[] = [];
  for (const line of rows) {
    let match: RegExpExecArray | null;
    while ((match = matcher.exec(line))) {
      const processed = new Set();
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
          partNumbers.push(+foundNumber);
        }
      });
    }
    matcher.lastIndex = 0;
    lineNumber++;
  }
  return partNumbers.reduce((agg, val) => agg + val, 0);
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
