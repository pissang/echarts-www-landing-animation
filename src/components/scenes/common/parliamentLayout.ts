export default function(
  startAngle: number,
  endAngle: number,
  r0: number,
  r1: number,
  size: number
) {
  const rowsCount = Math.ceil((r1 - r0) / size);
  const points: number[][] = [];

  let r = r0;
  for (let i = 0; i < rowsCount; i++) {
    for (
      let k = Math.floor((startAngle * r) / size) * size;
      k < Math.floor((endAngle * r) / size) * size;
      k += size
    ) {
      const angle = k / r;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push([x, y]);
    }

    r += size;
  }

  return points;
}
