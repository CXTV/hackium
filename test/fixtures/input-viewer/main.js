//@ts-nocheck
import { getPointsBetween } from '../../../src/util/movement';
import Bezier from 'bezier-js';
import { Random } from '../../../src/util/random';
const canvas = document.getElementById('canvas');

function getContext(canvas) {
  if (!canvas) throw new Error('no canvas');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('no context');
  return ctx;
}

const ctx = getContext(canvas);

function pctY(pct) { return canvas.height * pct }
function pctX(pct) { return canvas.width * pct }

const duration = 1000;
const bX = pctX(.8);
const bY = pctY(.4);
const cX = pctX(.8);
const cY = pctY(.4);


/******** */

const eachPoints = [
  [pctX(.1), pctY(.1), pctX(.7), pctY(.7)],
  // [pctX(.8), pctY(.9), pctX(.1), pctY(.2)],
  // [pctX(.9), pctY(.1), pctX(.1), pctY(.8)],
  // [pctX(.05), pctY(.95), pctX(.95), pctY(.05)],

].map(([fromX, fromY, toX, toY]) => ([
  // getPointsBetween(fromX, fromY, toX, toY, { duration }),
  // getPointsBetween(fromX, fromY, toX, toY, {
  //   duration,
  //   stepFunction: bezier(bX),
  // }),
  // getPointsBetween(fromX, fromY, toX, toY, {
  //   duration,
  //   stepFunctionX: bezier3(undefined, .8),
  //   stepFunctionY: bezier3(undefined, .7)
  // }),
  new SimulatedMovement(4, 2, 5).generatePath(new Vector(fromX, fromY), new Vector(toX, toY))
  // getPointsBetween(fromX, fromY, toX, toY, { duration }),
  // getPointsBetween(fromX, fromY, toX + 10, toY + 10, { duration }),
]));

const colors = ['#808', '#880', '#088', '#800', '#080', '#008'];
for (let i = 0; i < eachPoints.length; i++) {
  for (let j = 0; j < eachPoints[i].length; j++) {
    ctx.fillStyle = 'black';
    const points = eachPoints[i][j];
    const fromX = points[0][0];
    const fromY = points[0][1];
    const toX = points[points.length - 1][0];
    const toY = points[points.length - 1][1];
    ctx.fillRect(fromX - 1, fromY - 1, 3, 3);
    ctx.fillRect(toX - 1, toY - 1, 3, 3);

    draw(points, colors[j]);
  }
}

function draw(points, color, index = 0) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  const lastPoint = points[index - 1];
  const point = points[index];
  if (!point) return;
  // console.log(point);
  if (lastPoint) {
    ctx.moveTo(lastPoint[0], lastPoint[1]);
    ctx.lineTo(point[0], point[1]);
    ctx.stroke();
  }
  // ctx.fillRect(point[0], point[1], 2, 2);
  setTimeout(() => { draw(points, color, index + 1) }, 16);
}

