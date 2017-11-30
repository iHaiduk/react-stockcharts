"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Square(props) {
	var className = props.className,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    opacity = props.opacity,
	    fill = props.fill,
	    point = props.point,
	    width = props.width;

	var w = (0, _utils.functor)(width)(point.datum);
	var x = point.x - w / 2;
	var y = point.y - w / 2;
	return _jsx("rect", {
		className: className,
		x: x,
		y: y,
		stroke: stroke,
		strokeWidth: strokeWidth,
		fillOpacity: opacity,
		fill: fill,
		width: w,
		height: w
	});
}

Square.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-marker-rect"
};
Square.drawOnCanvas = function (props, point, ctx) {
	var stroke = props.stroke,
	    fill = props.fill,
	    opacity = props.opacity,
	    strokeWidth = props.strokeWidth;

	ctx.strokeStyle = stroke;
	ctx.lineWidth = strokeWidth;
	if (fill !== "none") {
		ctx.fillStyle = (0, _utils.hexToRGBA)(fill, opacity);
	}
	Square.drawOnCanvasWithNoStateChange(props, point, ctx);
};
Square.drawOnCanvasWithNoStateChange = function (props, point, ctx) {
	var width = props.width;

	var w = (0, _utils.functor)(width)(point.datum);
	var x = point.x - w / 2;
	var y = point.y - w / 2;
	ctx.beginPath();
	ctx.rect(x, y, w, w);
	ctx.stroke();
	ctx.fill();
};
exports.default = Square;
//# sourceMappingURL=SquareMarker.js.map