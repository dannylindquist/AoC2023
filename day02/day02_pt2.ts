const tokenRegex = /(?<count>\d+) (?<color>red|green|blue)/g;
function processInformation(gameData: string) {
  let total = 0;
  for (const line of gameData.split("\n")) {
    const parts = line.split(":");
    const gameId = +parts[0].substring(5);
    const roundData = { red: 0, green: 0, blue: 0 };
    for (const group of parts[1].split(";")) {
      let match;
      while ((match = tokenRegex.exec(group))) {
        const count = +match.groups!["count"];
        const color = match.groups!["color"];
        if (roundData[color] < count) {
          roundData[color] = count;
        }
      }
      tokenRegex.lastIndex = 0;
    }
    const power = Object.values(roundData).reduce((agg, val) => agg * val, 1);
    total += power;
  }
  return total;
}

console.log(processInformation(await Bun.file("./day02/text.txt").text()));

console.log(
  processInformation(
    `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`
  )
);
