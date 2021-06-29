import { seed, perlin2 } from './simplexNoise';

export const noiseXData: number[] = [];
export const noiseYData: number[] = [];
seed(Math.random());

function generateData() {
  const data = [];
  for (var i = 0; i <= 50; i++) {
    for (var j = 0; j <= 30; j++) {
      data.push([i, j, perlin2(i / 10, j / 5) + 0.5]);
    }
    noiseXData.push(i);
  }
  for (var j = 0; j < 20; j++) {
    noiseYData.push(j);
  }
  return data;
}
const data = generateData();

// const dataList: number[][][] = [];

// for (let n = 0; n < 10; n++) {
//   const data = [];
//   for (var i = 0; i <= 50; i++) {
//     for (var j = 0; j <= 30; j++) {
//       data.push([i, j, perlin2(i / 10 + n / 10, j / 5 - n / 10) + 0.5]);
//     }
//   }
//   dataList.push(data);
// }
// export const noiseData = dataList[dataList.length - 1];

export const noiseData = data;
