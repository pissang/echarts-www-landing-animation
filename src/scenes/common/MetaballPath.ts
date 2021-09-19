// Some reference on metaball
// http://paperjs.org/examples/meta-balls/
// https://medium.com/@tbarrasso/advanced-meta-metaballs-864bbf0a945c
// https://varun.ca/metaballs/
import { graphic } from 'echarts/core';

export class MetaballShape {
  // Source circle
  cx1 = 0;
  cy1 = 0;
  r1 = 0;

  // Target circle
  cx2 = 0;
  cy2 = 0;
  r2 = 0;

  maxDistance = 100;
}

// Constants
const handleSize = 2.4;
const v = 0.5;

type Point = [number, number];

function dist([x1, y1]: Point, [x2, y2]: Point) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** 0.5;
}

function angle([x1, y1]: Point, [x2, y2]: Point) {
  return Math.atan2(y1 - y2, x1 - x2);
}

function getVector([cx, cy]: Point, a: number, r: number): Point {
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

const Metaball = graphic.extendShape({
  type: 'metaball',

  buildPath(ctx: CanvasRenderingContext2D, shape: MetaballShape) {
    const HALF_PI = Math.PI / 2;
    const radius1 = shape.r1;
    const radius2 = shape.r2;
    const center1: Point = [shape.cx1, shape.cy1];
    const center2: Point = [shape.cx2, shape.cy2];
    const d = dist(center1, center2);
    const maxDist = radius1 + radius2 * 2.5;
    let u1, u2;

    if (
      radius1 === 0 ||
      radius2 === 0 ||
      d > maxDist ||
      d <= Math.abs(radius1 - radius2)
    ) {
      return;
    }

    if (d < radius1 + radius2) {
      u1 = Math.acos(
        (radius1 * radius1 + d * d - radius2 * radius2) / (2 * radius1 * d)
      );
      u2 = Math.acos(
        (radius2 * radius2 + d * d - radius1 * radius1) / (2 * radius2 * d)
      );
    } else {
      u1 = 0;
      u2 = 0;
    }

    // All the angles
    const angleBetweenCenters = angle(center2, center1);
    const maxSpread = Math.acos((radius1 - radius2) / d);

    const angle1 = angleBetweenCenters + u1 + (maxSpread - u1) * v;
    const angle2 = angleBetweenCenters - u1 - (maxSpread - u1) * v;
    const angle3 =
      angleBetweenCenters + Math.PI - u2 - (Math.PI - u2 - maxSpread) * v;
    const angle4 =
      angleBetweenCenters - Math.PI + u2 + (Math.PI - u2 - maxSpread) * v;
    // Points
    const p1 = getVector(center1, angle1, radius1);
    const p2 = getVector(center1, angle2, radius1);
    const p3 = getVector(center2, angle3, radius2);
    const p4 = getVector(center2, angle4, radius2);

    // Define handle length by the
    // distance between both ends of the curve
    const totalRadius = radius1 + radius2;
    const d2Base = Math.min(v * handleSize, dist(p1, p3) / totalRadius);

    // Take into account when circles are overlapping
    const d2 = d2Base * Math.min(1, (d * 2) / (radius1 + radius2));

    const r1 = radius1 * d2;
    const r2 = radius2 * d2;

    const h1 = getVector(p1, angle1 - HALF_PI, r1);
    const h2 = getVector(p2, angle2 + HALF_PI, r1);
    const h3 = getVector(p3, angle3 + HALF_PI, r2);
    const h4 = getVector(p4, angle4 - HALF_PI, r2);

    ctx.moveTo(p1[0], p1[1]);
    ctx.bezierCurveTo(h1[0], h1[1], h3[0], h3[1], p3[0], p3[1]);
    ctx.lineTo(p4[0], p4[1]);
    ctx.bezierCurveTo(h4[0], h4[1], h2[0], h2[1], p2[0], p2[1]);
  },
});

export default Metaball;
