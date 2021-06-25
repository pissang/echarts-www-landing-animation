export default function(
  pieData: { value: number }[],
  startAngle: number,
  totalAngle: number
) {
  const angles: number[] = [];
  const sum = pieData.reduce((sum, cur) => {
    return sum + cur.value;
  }, 0);
  let curAngle = startAngle;
  pieData.forEach(item => {
    angles.push(curAngle);
    curAngle += (item.value / sum) * totalAngle;
  });
  angles.push(startAngle + totalAngle);
  return angles;
}
