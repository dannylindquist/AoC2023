function isDigit(text: string) {
  return !Number.isNaN(+text);
}

// destinationStart sourceStart rangeLength
const steps = [
  "soil",
  "fertilizer",
  "water",
  "light",
  "temperature",
  "humidity",
  "location",
] as const;
function processData(data: string) {
  const lines = data.split("\n");
  const seedChunks = [
    ...lines
      .splice(0, 1)[0]
      .substring(6)
      .trim()
      .matchAll(/\d+ \d+/g),
  ].map((group) => group[0].split(" ").map((item) => +item));
  const plantMap: Record<string, [number, number, number][]> = {};
  let currentSubject: string[] = [];
  for (const line of lines) {
    if (line === "") {
      continue;
    }
    if (!isDigit(line[0])) {
      currentSubject = line.split(" ")[0].split("-to-");
      plantMap[currentSubject[1]] = [];
    } else {
      const [destination, source, range] = line.split(" ").map((x) => x);
      plantMap[currentSubject[1]].push([+destination, +source, +range]);
    }
  }
  let min = Infinity;
  for (const [seedStart, seedEnd] of seedChunks) {
    console.log("seed start");
    for (let seed = seedStart; seed < seedStart + seedEnd; seed++) {
      let value = +seed;
      console.log(seedStart + seedEnd - seed);
      for (const step of steps) {
        for (const [destination, source, range] of plantMap[step]) {
          if (value >= source && value <= source + range) {
            value = destination + (value - source);
            break;
          }
        }
      }
      if (value < min) {
        min = value;
      }
    }
    console.log("seed end");
  }
  return min;
}

console.log(
  processData(`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`)
);

console.log(processData(await Bun.file("./day05/text.txt").text()));
