function calcFlatPosition(row: number, column: number, lineLength: number) {
  return row * lineLength + column + 1;
}

function calcCoordinates(position: number, lineLength: number) {
  const row = Math.floor(position / lineLength);
  const column = position - row * lineLength - 1;
  return [row, column];
}

function walk(
  startPosition: number,
  previousPosition: number,
  currentPosition: number,
  data: string,
  rowLength: number,
  totalLength: number,
  coordinates: number[]
) {
  if (startPosition === currentPosition) {
    return totalLength;
  }
  const pipe = data[currentPosition];
  let nextDirection = 0;
  switch (pipe) {
    case ".":
      return -1;
    case "-":
    case "|": {
      const direction = currentPosition - previousPosition;
      nextDirection = direction;
      break;
    }
    case "L": {
      const change = currentPosition - previousPosition;
      // change is -1 then we go
      if (Math.abs(change) == 1) {
        nextDirection = -(rowLength + 1);
      } else {
        nextDirection = 1;
      }
      break;
    }
    case "F": {
      const change = currentPosition - previousPosition;
      // change is 1 then we go down
      if (Math.abs(change) == 1) {
        nextDirection = rowLength + 1;
      } else {
        nextDirection = 1;
      }
      break;
    }
    case "7": {
      const change = currentPosition - previousPosition;
      // change is 1 then we go down
      if (Math.abs(change) == 1) {
        nextDirection = rowLength + 1;
      } else {
        nextDirection = -1;
      }
      break;
    }
    case "J": {
      const change = currentPosition - previousPosition;
      // change is 1 then we go down
      if (Math.abs(change) == 1) {
        nextDirection = -(rowLength + 1);
      } else {
        nextDirection = -1;
      }
      break;
    }
    case "\n": {
      return -1;
    }
  }
  if (nextDirection !== 0) {
    coordinates.push(currentPosition + nextDirection);
    return walk(
      startPosition,
      currentPosition,
      currentPosition + nextDirection,
      data,
      rowLength,
      totalLength + 1,
      coordinates
    );
  }
  return -1;
}

function processData(data: string) {
  const rowLength = data.indexOf("\n");
  const directions: [number, string, string, string][] = [
    [1, "-", "7", "J"],
    [-1, "-", "F", "L"],
    [rowLength + 1, "|", "J", "L"],
    [-(rowLength + 1), "|", "7", "F"],
  ];
  const animalPosition = data.indexOf("S");

  const results = directions
    .map(([direction, ...goodPosition]) => {
      const newDirection = animalPosition + direction;
      const point = data[newDirection];
      if (goodPosition.includes(point)) {
        const coordinates = [animalPosition, newDirection];
        const total = walk(
          animalPosition,
          animalPosition,
          newDirection,
          data,
          rowLength,
          0,
          coordinates
        );
        return [total, coordinates];
      }
      return [-1];
    })
    .sort((a, b) => b[0] - a[0]);
  console.log(results[0]);
}

console.log(
  processData(`.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`)
);

//console.log(processData(await Bun.file("./day10/text.txt").text()));
