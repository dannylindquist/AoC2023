const chunks = [
  [28965817, 302170009],
  [1752849261, 48290258],
  [804904201, 243492043],
  [2150339939, 385349830],
  [1267802202, 350474859],
  [2566296746, 17565716],
  [3543571814, 291402104],
  [447111316, 279196488],
  [3227221259, 47952959],
  [1828835733, 9607836],
];

let range: (typeof chunks)[0] = [];
for (const chunk of chunks) {
  if (!range.length) {
    range = [chunk[0], chunk[0] + chunk[1]];
  } else {
    const min = chunk[0];
    const max = chunk[0] + chunk[1];
    console.log(min, max);
    if (min < range[0] && max > range[0]) {
      range[0] = min;
      console.log("minned");
    }
    if (min > range[0] && min < range[1] && max > range[1]) {
      range[1] = max;
      console.log("maxed");
    }
  }
}
