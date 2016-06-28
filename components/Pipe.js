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
    this.points = [props.start, props.end, props.controlA, props.controlB];
    this.mousedown = {};
    this.dragging = false;
    this.draggingPoint = false;
  }

  drawEndPoints(context, points) {
    context.strokeStyle = 'blue';
    context.fillStyle = 'red';
    points.forEach(p => {
      context.beginPath();
      context.arc(p.x, p.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
      context.stroke();
      context.fill();
    });
  }

  drawControlPoints(context, points) {
    context.strokeStyle = 'yello';
    context.fillStyle = 'blue';
    points.forEach(p => {
      context.beginPath();
      context.arc(p.x, p.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
      context.stroke();
      context.fill();
    });
  }

  drawProgressPoint(context, point) {
    context.strokeStyle = 'yello';
    context.fillStyle = 'blue';

    context.beginPath();
    context.arc(point.x, point.y, CONTROL_POINT_RADIUS, 0, Math.PI * 2, false);
    context.stroke();
    context.fill();
  }

  drawBezierCurve(context, endPoints, controlPoints) {
    context.strokeStyle = 'green';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(endPoints[0].x, endPoints[0].y);
    context.bezierCurveTo(controlPoints[0].x, controlPoints[0].y,
      controlPoints[1].x, controlPoints[1].y, endPoints[1].x, endPoints[1].y);
    context.stroke();
  }

  reset() {
    this.canvas.width = this.canvas.width;
  }

  draw(context) {
    const points = resolvePoints(this.points);
    const endPoints = [points[0], points[1]];
    const controlPoints = [points[2], points[3]];
    this.drawControlPoints(context, controlPoints);
    this.drawEndPoints(context, endPoints);
    this.drawBezierCurve(context, endPoints, controlPoints);

    const params = [
      points[0].x, points[0].y,
      points[2].x, points[2].y,
      points[3].x, points[3].y,
      points[1].x, points[1].y
    ];
    const curve = new Bezier(...params);
    const progressPoint = curve.get(this.props.progress / 100);
    this.drawProgressPoint(context, progressPoint);
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d');
    this.draw(this.context);
  }

  componentWillReceiveProps(props) {
    this.points = [props.start, props.end, props.controlA, props.controlB];
    this.reset();
    this.draw(this.context);
  }

  render() {
    const rect = resolveBoundingRect(this.points);
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
  start: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  end: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  controlA: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  controlB: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  progress: PropTypes.number.isRequired,
};
