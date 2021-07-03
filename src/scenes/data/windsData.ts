import windData from './winds.json';

function shuffle(array: any[]) {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

let p = 0;
let maxMag = 0;
let minMag = Infinity;
const data: number[][] = [];
for (let j = 0; j < (windData as any).ny; j++) {
  for (let i = 0; i < (windData as any).nx; i++, p++) {
    const vx = (windData as any).data[p][0];
    const vy = (windData as any).data[p][1];
    const lng = (i / (windData as any).nx) * 360 - 180;
    const lat = (j / (windData as any).ny) * 180 - 90;
    const mag = Math.sqrt(vx * vx + vy * vy);
    // 数据是一个一维数组
    // [ [经度, 维度，向量经度方向的值，向量维度方向的值] ]
    data.push([lng, lat, vx, vy, mag]);
    maxMag = Math.max(mag, maxMag);
    minMag = Math.min(mag, minMag);
  }
}
shuffle(data);

export default {
  min: minMag,
  max: maxMag,
  nx: (windData as any).nx,
  ny: (windData as any).ny,
  data,
};
