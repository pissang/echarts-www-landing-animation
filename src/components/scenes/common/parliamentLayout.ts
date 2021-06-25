export default function(
  startAngle: number,
  endAngle: number,
  totalAngle: number,
  r0: number,
  r1: number,
  size: number
) {
  const rowsCount = Math.ceil((r1 - r0) / size);
  const points: number[][] = [];

  let r = r0;
  for (let i = 0; i < rowsCount; i++) {
    // Recalculate size
    const totalRingSeatsNumber = Math.round((totalAngle * r) / size);
    const newSize = (totalAngle * r) / totalRingSeatsNumber;
    for (
      let k = Math.floor((startAngle * r) / newSize) * newSize;
      k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
      k += newSize
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
