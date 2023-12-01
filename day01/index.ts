
function performCalculationChallenge1(words: string) {
  const lines = words.split('\n');
  let total = 0;
  for(let line of lines) {
    let first = '';
    let second = '';
    for(let item of line) {
      const parsed = parseInt(item, 10);
      if(isNaN(parsed)) {
        continue;
      }
      if(!first) {
        first = item;
      } 
      second = item;
    }
    total += +(first + second);
  }
  return total;
}

const valueMap = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

const keys = Object.keys(valueMap);

const matcher = /(one|two|three|four|five|six|seven|eight|nine|\d)/g;

function performCalculationChallenge2(words: string) {
  const lines = words.split('\n');
  let total = 0;
  for(let line of lines) {
    let first = '';
    let second = '';
    let match;
    const values = [];
    while(match = matcher.exec(line)) {
      const type = match[0].length > 1 ? 'word': 'digit';
      let value = match[0].length === 1 ? match[0] : valueMap[match[0]];
      values.push(value)
      if(!first) {
        first = value;
      }
      second = value;
      if(type === 'word') {
        line = line.substring((match.index + match[0].length -1) ?? 0)
        matcher.lastIndex = 0;    
      }
    }
    total += +(first + second);
    matcher.lastIndex = 0;
  }
  return total;
}


// console.log(performCalculationChallenge1(await Bun.file('./day01/test-input.txt').text()));

console.log(performCalculationChallenge2(await Bun.file('./day01/test-input.txt').text()));