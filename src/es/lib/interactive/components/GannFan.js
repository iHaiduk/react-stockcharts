var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { pairs } from "d3-array";
import { path as d3Path } from "d3-path";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";
import { generateLine, isHovering2 } from "./StraightLine";

import { isDefined, isNotDefined, noop, hexToRGBA } from "../../utils";

var GannFan = function (_Component) {
	_inherits(GannFan, _Component);

	function GannFan(props) {
		_classCallCheck(this, GannFan);

		var _this = _possibleConstructorReturn(this, (GannFan.__proto__ || Object.getPrototypeOf(GannFan)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(GannFan, [{
		key: "isHover",
		value: function isHover(moreProps) {
			var _props = this.props,
			    tolerance = _props.tolerance,
			    onHover = _props.onHover;
			var mouseXY = moreProps.mouseXY;

			var _mouseXY = _slicedToArray(mouseXY, 2),
			    mouseX = _mouseXY[0],
			    mouseY = _mouseXY[1];

			var hovering = false;
			if (isDefined(onHover)) {

				var lines = helper(this.props, moreProps);

				for (var i = 0; i < lines.length; i++) {
					var line1 = lines[i];

					var left = Math.min(line1.x1, line1.x2);
					var right = Math.max(line1.x1, line1.x2);
					var top = Math.min(line1.y1, line1.y2);
					var bottom = Math.max(line1.y1, line1.y2);

					var isWithinLineBounds = mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom;

					hovering = isWithinLineBounds && isHovering2([line1.x1, line1.y1], [line1.x2, line1.y2], mouseXY, tolerance);

					if (hovering) break;
				}
			}
			return hovering;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props2 = this.props,
			    stroke = _props2.stroke,
			    strokeWidth = _props2.strokeWidth,
			    strokeOpacity = _props2.strokeOpacity,
			    fill = _props2.fill,
			    fillOpacity = _props2.fillOpacity,
			    fontFamily = _props2.fontFamily,
			    fontSize = _props2.fontSize,
			    fontFill = _props2.fontFill;


			var lines = helper(this.props, moreProps);

			ctx.lineWidth = strokeWidth;
			ctx.strokeStyle = hexToRGBA(stroke, strokeOpacity);

			ctx.font = fontSize + "px " + fontFamily;
			ctx.fillStyle = fontFill;

			lines.forEach(function (line) {
				var x1 = line.x1,
				    y1 = line.y1,
				    x2 = line.x2,
				    y2 = line.y2,
				    label = line.label;


				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.stroke();
				ctx.beginPath();
				ctx.fillText(label.text, label.x, label.y);
			});
			var pairsOfLines = pairs(lines);

			pairsOfLines.forEach(function (_ref, idx) {
				var _ref2 = _slicedToArray(_ref, 2),
				    line1 = _ref2[0],
				    line2 = _ref2[1];

				ctx.fillStyle = hexToRGBA(fill[idx], fillOpacity);

				ctx.beginPath();
				ctx.moveTo(line1.x1, line1.y1);
				ctx.lineTo(line1.x2, line1.y2);
				ctx.lineTo(line2.x2, line2.y2);
				ctx.closePath();
				ctx.fill();
			});
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props3 = this.props,
			    stroke = _props3.stroke,
			    strokeWidth = _props3.strokeWidth,
			    fillOpacity = _props3.fillOpacity,
			    fill = _props3.fill,
			    strokeOpacity = _props3.strokeOpacity;


			var lines = helper(this.props, moreProps);
			var pairsOfLines = pairs(lines);

			return _jsx("g", {}, void 0, lines.map(function (each, idx) {
				var x1 = each.x1,
				    y1 = each.y1,
				    x2 = each.x2,
				    y2 = each.y2;

				return _jsx("line", {
					strokeWidth: strokeWidth,
					stroke: stroke,
					strokeOpacity: strokeOpacity,
					x1: x1,
					y1: y1,
					x2: x2,
					y2: y2
				}, idx);
			}), pairsOfLines.map(function (_ref3, idx) {
				var _ref4 = _slicedToArray(_ref3, 2),
				    line1 = _ref4[0],
				    line2 = _ref4[1];

				var ctx = d3Path();
				ctx.moveTo(line1.x1, line1.y1);
				ctx.lineTo(line1.x2, line1.y2);
				ctx.lineTo(line2.x2, line2.y2);
				ctx.closePath();
				return _jsx("path", {
					stroke: "none",
					fill: fill[idx],
					fillOpacity: fillOpacity,
					d: ctx.toString()
				}, idx);
			}));
		}
	}, {
		key: "render",
		value: function render() {
			var _props4 = this.props,
			    selected = _props4.selected,
			    interactiveCursorClass = _props4.interactiveCursorClass;
			var _props5 = this.props,
			    onDragStart = _props5.onDragStart,
			    onDrag = _props5.onDrag,
			    onDragComplete = _props5.onDragComplete,
			    onHover = _props5.onHover,
			    onUnHover = _props5.onUnHover;


			return _jsx(GenericChartComponent, {
				isHover: this.isHover,
				svgDraw: this.renderSVG,
				canvasToDraw: getMouseCanvas,
				canvasDraw: this.drawOnCanvas,
				interactiveCursorClass: interactiveCursorClass,
				selected: selected,
				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,
				drawOn: ["mousemove", "mouseleave", "pan", "drag"]
			});
		}
	}]);

	return GannFan;
}(Component);

function getLineCoordinates(start, endX, endY, text) {
	var end = [endX, endY];
	return {
		start: start, end: end, text: text
	};
}

function helper(props, moreProps) {
	var startXY = props.startXY,
	    endXY = props.endXY;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale;

	if (isNotDefined(startXY) || isNotDefined(endXY)) {
		return [];
	}

	var _startXY = _slicedToArray(startXY, 2),
	    x1 = _startXY[0],
	    y1 = _startXY[1];

	var _endXY = _slicedToArray(endXY, 2),
	    x2 = _endXY[0],
	    y2 = _endXY[1];

	var dx = x2 - x1;
	var dy = y2 - y1;

	if (dx !== 0 && dy !== 0) {
		// console.log("modLine ->", startXY, modLine, dx1, dy1)
		var halfY = getLineCoordinates(startXY, x2, y1 + dy / 2, "2/1");
		var oneThirdY = getLineCoordinates(startXY, x2, y1 + dy / 3, "3/1");
		var oneFourthY = getLineCoordinates(startXY, x2, y1 + dy / 4, "4/1");
		var oneEighthY = getLineCoordinates(startXY, x2, y1 + dy / 8, "8/1");
		var halfX = getLineCoordinates(startXY, x1 + dx / 2, y2, "1/2");
		var oneThirdX = getLineCoordinates(startXY, x1 + dx / 3, y2, "1/3");
		var oneFourthX = getLineCoordinates(startXY, x1 + dx / 4, y2, "1/4");
		var oneEighthX = getLineCoordinates(startXY, x1 + dx / 8, y2, "1/8");
		var lines = [oneEighthX, oneFourthX, oneThirdX, halfX, { start: startXY, end: endXY, text: "1/1" }, halfY, oneThirdY, oneFourthY, oneEighthY];
		var lineCoods = lines.map(function (line) {
			var _generateLine = generateLine({
				type: "RAY",
				start: line.start,
				end: line.end,
				xScale: xScale,
				yScale: yScale
			}),
			    x1 = _generateLine.x1,
			    y1 = _generateLine.y1,
			    x2 = _generateLine.x2,
			    y2 = _generateLine.y2;

			return {
				x1: xScale(x1),
				y1: yScale(y1),
				x2: xScale(x2),
				y2: yScale(y2),
				label: {
					x: xScale(line.end[0]),
					y: yScale(line.end[1]),
					text: line.text
				}
			};
		});
		return lineCoods;
	}
	return [];
}

GannFan.defaultProps = {
	onDragStart: noop,
	onDrag: noop,
	onDragComplete: noop,

	strokeWidth: 1,
	tolerance: 4,
	selected: false
};

export default GannFan;
//# sourceMappingURL=GannFan.js.map