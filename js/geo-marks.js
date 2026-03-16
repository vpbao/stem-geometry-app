/**
 * Geometry Notation Helpers — tick marks & angle marks for p5.js
 * Usage: include this script before module p5 code.
 *
 * drawTickMark(p, x1, y1, x2, y2, ticks, color)
 *   — draws 1/2/3 tick marks at midpoint of segment
 *
 * drawAngleArcMark(p, cx, cy, startAngle, endAngle, radius, ticks, color)
 *   — draws arc with 1/2 tick marks on the arc
 *
 * drawRightAngle(p, footX, footY, dirX, dirY, perpX, perpY, size, color)
 *   — draws the standard right-angle square marker
 */

window.GeoMarks = {
  /**
   * Draw tick marks (like the "=" symbol) at the midpoint of a segment.
   * @param {p5} p - p5 instance
   * @param {number} x1,y1,x2,y2 - segment endpoints
   * @param {number} ticks - number of tick marks (1, 2, or 3)
   * @param {string} color - stroke color
   * @param {number} [tickLen=7] - half-length of each tick
   */
  drawTickMark(p, x1, y1, x2, y2, ticks, color, tickLen) {
    tickLen = tickLen || 7;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const dx = x2 - x1, dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    // Unit direction along segment
    const ux = dx / len, uy = dy / len;
    // Perpendicular direction
    const nx = -uy, ny = ux;
    const spacing = 5;

    p.push();
    p.stroke(color);
    p.strokeWeight(2);
    for (let i = 0; i < ticks; i++) {
      const offset = (i - (ticks - 1) / 2) * spacing;
      const cx = mx + ux * offset;
      const cy = my + uy * offset;
      p.line(cx - nx * tickLen, cy - ny * tickLen, cx + nx * tickLen, cy + ny * tickLen);
    }
    p.pop();
  },

  /**
   * Draw an angle arc with tick marks on it.
   * @param {p5} p - p5 instance
   * @param {number} cx,cy - vertex of angle
   * @param {number} startAngle,endAngle - arc angles in radians
   * @param {number} radius - arc radius
   * @param {number} ticks - number of tick marks (1 or 2)
   * @param {string} color - stroke color
   */
  drawAngleArcMark(p, cx, cy, startAngle, endAngle, radius, ticks, color) {
    p.push();
    p.noFill();
    p.stroke(color);
    p.strokeWeight(2);
    p.arc(cx, cy, radius * 2, radius * 2, startAngle, endAngle);

    // Draw tick marks on the arc
    const spacing = 0.08; // radians between ticks
    const midA = (startAngle + endAngle) / 2;
    const tl = 5; // tick half-length

    for (let i = 0; i < ticks; i++) {
      const offset = (i - (ticks - 1) / 2) * spacing;
      const a = midA + offset;
      // Point on arc
      const ax = cx + Math.cos(a) * radius;
      const ay = cy + Math.sin(a) * radius;
      // Radial direction (outward)
      const rx = Math.cos(a), ry = Math.sin(a);
      p.line(ax - rx * tl, ay - ry * tl, ax + rx * tl, ay + ry * tl);
    }
    p.pop();
  },

  /**
   * Draw a right-angle square marker at a foot of altitude.
   * @param {p5} p - p5 instance
   * @param {number} fx,fy - foot point
   * @param {number} ux,uy - unit direction along the base side
   * @param {number} vx,vy - unit direction along the altitude
   * @param {number} size - side length of square
   * @param {string} color - stroke color
   */
  drawRightAngle(p, fx, fy, ux, uy, vx, vy, size, color) {
    p.push();
    p.noFill();
    p.stroke(color);
    p.strokeWeight(1.5);
    const p1x = fx + ux * size, p1y = fy + uy * size;
    const p2x = p1x + vx * size, p2y = p1y + vy * size;
    const p3x = fx + vx * size, p3y = fy + vy * size;
    p.line(p1x, p1y, p2x, p2y);
    p.line(p2x, p2y, p3x, p3y);
    p.pop();
  }
};
