/* eslint-disable no-param-reassign */
import React, { Component, PropTypes } from 'react';
import { StyleSheet, css } from 'aphrodite';
import Bezier from 'bezier-js';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});

const CONTROL_POINT_RADIUS = 5;

/**
 * calc a minimal Rect which contains all the points
 * @param  {array} points points defined with { x, y }
 * @return {object}        rect description object
 */
function resolveBoundingRect(points) {
  const xPoses = points.map(p => p.x);
  const yPoses = points.map(p => p.y);

  const gap = CONTROL_POINT_RADIUS + 1;
  const minX = Math.min(...xPoses) - gap;
  const maxX = Math.max(...xPoses) + gap;

  const minY = Math.min(...yPoses) - gap;
  const maxY = Math.max(...yPoses) + gap;

  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

/**
 * convert viewport points to canvas points
 * @param  {[type]} points original viewport points
 * @return {[type]}        converted points
 */
function resolvePoints(points) {
  const rect = resolveBoundingRect(points);
  return points.map(p =>
    ({
      x: p.x - rect.x,
      y: p.y - rect.y,
    })
  );
}

export default class Pipe extends Component {
  constructor(props) {
    super(props);
    this.curve = new Bezier(resolvePoints(props.points));
    this.points = this.curve.points;
    this.mousedown = {};
    this.dragging = false;
    this.draggingPoint = false;
  }

  drawEndPoints(ctx, points) {
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'red';
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
    });
  }

  drawControlPoints(ctx, points) {
    ctx.strokeStyle = 'yello';
    ctx.fillStyle = 'blue';
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.fill();
    });
  }

  drawProgressPoint(ctx, point) {
    ctx.strokeStyle = 'yello';
    ctx.fillStyle = 'blue';

    ctx.beginPath();
    ctx.arc(point.x, point.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.fill();
  }

  drawBezierCurve(ctx, points) {
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.bezierCurveTo(points[1].x, points[1].y,
      points[2].x, points[2].y, points[3].x, points[3].y);
    ctx.stroke();
  }

  reset() {
    this.canvas.width = this.canvas.width;
  }

  draw(ctx) {
    const points = this.points;
    const endPoints = [points[0], points[3]];
    const controlPoints = [points[1], points[2]];
    this.drawBezierCurve(ctx, points);
    this.drawControlPoints(ctx, controlPoints);
    this.drawEndPoints(ctx, endPoints);
    const progressPoint = this.curve.get(this.props.progress / 100);
    this.drawProgressPoint(ctx, progressPoint);
  }

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.draw(this.ctx);
  }

  componentWillReceiveProps(props) {
    this.curve = new Bezier(resolvePoints(props.points));
    this.points = this.curve.points;
    this.reset();
    this.draw(this.ctx);
  }

  render() {
    const rect = resolveBoundingRect(this.props.points);
    const dStyles = {
      rect: {
        left: rect.x,
        top: rect.y,
        width: rect.width,
        height: rect.height,
      },
    };
    return (
      <div className={css(styles.container)} style={dStyles.rect}>
        <canvas ref={c => { this.canvas = c; }} width={rect.width} height={rect.height} />
      </div>
    );
  }
}

Pipe.propTypes = {
  points: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired,
};
