export function hilbert(
  x: number,
  y: number,
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
) {
  const bits = 16;
  x = maxX === minX ? 0 : Math.round((32767 * (x - minX)) / (maxX - minX));
  y = maxY === minY ? 0 : Math.round((32767 * (y - minY)) / (maxY - minY));

  let d = 0;
  let tmp: number;
  for (let s = (1 << bits) / 2; s > 0; s /= 2) {
    let rx = 0,
      ry = 0;

    if ((x & s) > 0) rx = 1;
    if ((y & s) > 0) ry = 1;

    d += s * s * ((3 * rx) ^ ry);

    if (ry === 0) {
      if (rx === 1) {
        x = s - 1 - x;
        y = s - 1 - y;
      }
      tmp = x;
      x = y;
      y = tmp;
    }
  }
  return d;
}
