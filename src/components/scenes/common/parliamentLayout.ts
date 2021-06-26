export function layoutSector(
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

export function packAll(
  startAngle: number,
  endAngle: number,
  r0: number,
  r1: number,
  count: number
) {
  const totalAngle = endAngle - startAngle;
  const area = (totalAngle / 2) * (r1 * r1 - r0 * r0);
  const size = Math.floor(Math.sqrt(area / count));
  const ringCount = Math.ceil((r1 - r0) / size);
  const points: number[][] = [];

  for (let i = 0; i < ringCount; i++) {
    const r = r0 * size;
    const totalRingSeatsNumber = Math.round((totalAngle * r) / size);
    const newSize = (totalAngle * r) / totalRingSeatsNumber;
    for (
      let k = Math.floor((startAngle * r) / newSize) * newSize;
      k < Math.floor((endAngle * r) / newSize) * newSize;
      k += newSize
    ) {
      const angle = k / r;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      points.push([x, y]);
    }
  }

  return points;
}
