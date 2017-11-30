"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EdgeCoordinate = function (_Component) {
	_inherits(EdgeCoordinate, _Component);

	function EdgeCoordinate() {
		_classCallCheck(this, EdgeCoordinate);

		return _possibleConstructorReturn(this, (EdgeCoordinate.__proto__ || Object.getPrototypeOf(EdgeCoordinate)).apply(this, arguments));
	}

	_createClass(EdgeCoordinate, [{
		key: "render",
		value: function render() {
			var className = this.props.className;


			var edge = helper(this.props);
			if (edge === null) return null;
			var line = void 0,
			    coordinateBase = void 0,
			    coordinate = void 0;

			if ((0, _utils.isDefined)(edge.line)) {
				line = _jsx("line", {
					className: "react-stockcharts-cross-hair",
					opacity: edge.line.opacity,
					stroke: edge.line.stroke,
					x1: edge.line.x1,
					y1: edge.line.y1,
					x2: edge.line.x2,
					y2: edge.line.y2
				});
			}
			if ((0, _utils.isDefined)(edge.coordinateBase)) {
				var _edge$coordinateBase = edge.coordinateBase,
				    rectWidth = _edge$coordinateBase.rectWidth,
				    rectHeight = _edge$coordinateBase.rectHeight,
				    arrowWidth = _edge$coordinateBase.arrowWidth;


				var path = edge.orient === "left" ? "M0,0L0," + rectHeight + "L" + rectWidth + "," + rectHeight + "L" + (rectWidth + arrowWidth) + ",10L" + rectWidth + ",0L0,0L0,0" : "M0," + arrowWidth + "L" + arrowWidth + "," + rectHeight + "L" + (rectWidth + arrowWidth) + "," + rectHeight + "L" + (rectWidth + arrowWidth) + ",0L" + arrowWidth + ",0L0," + arrowWidth;

				coordinateBase = edge.orient === "left" || edge.orient === "right" ? _jsx("g", {
					transform: "translate(" + edge.coordinateBase.edgeXRect + "," + edge.coordinateBase.edgeYRect + ")"
				}, void 0, _jsx("path", {
					d: path,
					className: "react-stockchart-text-background",
					height: rectHeight,
					width: rectWidth,
					fill: edge.coordinateBase.fill,
					opacity: edge.coordinateBase.opacity
				}, 1)) : _jsx("rect", {
					className: "react-stockchart-text-background",
					x: edge.coordinateBase.edgeXRect,
					y: edge.coordinateBase.edgeYRect,
					height: rectHeight,
					width: rectWidth,
					fill: edge.coordinateBase.fill,
					opacity: edge.coordinateBase.opacity
				}, 1);

				coordinate = _jsx("text", {
					x: edge.coordinate.edgeXText,
					y: edge.coordinate.edgeYText,
					textAnchor: edge.coordinate.textAnchor,
					fontFamily: edge.coordinate.fontFamily,
					fontSize: edge.coordinate.fontSize,
					dy: ".32em",
					fill: edge.coordinate.textFill
				}, 2, edge.coordinate.displayCoordinate);
			}
			return _jsx("g", {
				className: className
			}, void 0, line, coordinateBase, coordinate);
		}
	}]);

	return EdgeCoordinate;
}(_react.Component);

EdgeCoordinate.defaultProps = {
	className: "react-stockcharts-edgecoordinate",
	orient: "left",
	hideLine: false,
	fill: "#8a8a8a",
	opacity: 1,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 13,
	textFill: "#FFFFFF",
	lineStroke: "#000000",
	lineOpacity: 0.3,
	arrowWidth: 10
};

function helper(props) {
	var displayCoordinate = props.coordinate,
	    show = props.show,
	    type = props.type,
	    orient = props.orient,
	    edgeAt = props.edgeAt,
	    hideLine = props.hideLine;
	var fill = props.fill,
	    opacity = props.opacity,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    textFill = props.textFill,
	    lineStroke = props.lineStroke,
	    lineOpacity = props.lineOpacity,
	    arrowWidth = props.arrowWidth;
	var rectWidth = props.rectWidth,
	    rectHeight = props.rectHeight;
	var x1 = props.x1,
	    y1 = props.y1,
	    x2 = props.x2,
	    y2 = props.y2;


	if (!show) return null;

	// rectWidth = rectWidth ? rectWidth : (type === "horizontal") ? 60 : 100;

	var edgeXRect = void 0,
	    edgeYRect = void 0,
	    edgeXText = void 0,
	    edgeYText = void 0;

	if (type === "horizontal") {

		edgeXRect = orient === "right" ? edgeAt + 1 : edgeAt - rectWidth - arrowWidth - 1;
		edgeYRect = y1 - rectHeight / 2;
		edgeXText = orient === "right" ? edgeAt + rectWidth / 2 + arrowWidth : edgeAt - rectWidth / 2 - arrowWidth;
		edgeYText = y1;
	} else {
		edgeXRect = x1 - rectWidth / 2;
		edgeYRect = orient === "bottom" ? edgeAt : edgeAt - rectHeight;
		edgeXText = x1;
		edgeYText = orient === "bottom" ? edgeAt + rectHeight / 2 : edgeAt - rectHeight / 2;
	}
	var coordinateBase = void 0,
	    coordinate = void 0;
	var textAnchor = "middle";
	if ((0, _utils.isDefined)(displayCoordinate)) {
		coordinateBase = {
			edgeXRect: edgeXRect, edgeYRect: edgeYRect, rectHeight: rectHeight, rectWidth: rectWidth, fill: fill, opacity: opacity, arrowWidth: arrowWidth
		};
		coordinate = {
			edgeXText: edgeXText, edgeYText: edgeYText, textAnchor: textAnchor, fontFamily: fontFamily, fontSize: fontSize, textFill: textFill, displayCoordinate: displayCoordinate
		};
	}

	var line = hideLine ? undefined : {
		opacity: lineOpacity, stroke: lineStroke, x1: x1, y1: y1, x2: x2, y2: y2
	};
	return {
		coordinateBase: coordinateBase, coordinate: coordinate, line: line, orient: orient
	};
}

EdgeCoordinate.drawOnCanvasStatic = function (ctx, props) {
	props = _extends({}, EdgeCoordinate.defaultProps, props);

	var edge = helper(props);

	if (edge === null) return;

	if ((0, _utils.isDefined)(edge.coordinateBase)) {
		var _edge$coordinateBase2 = edge.coordinateBase,
		    rectWidth = _edge$coordinateBase2.rectWidth,
		    rectHeight = _edge$coordinateBase2.rectHeight,
		    arrowWidth = _edge$coordinateBase2.arrowWidth;


		ctx.fillStyle = (0, _utils.hexToRGBA)(edge.coordinateBase.fill, edge.coordinateBase.opacity);

		var x = edge.coordinateBase.edgeXRect;
		var y = edge.coordinateBase.edgeYRect;

		ctx.beginPath();

		if (edge.orient === "right") {
			ctx.moveTo(x, y + rectHeight / 2);
			ctx.lineTo(x + arrowWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y + rectHeight);
			ctx.lineTo(x + arrowWidth, y + rectHeight);
			ctx.closePath();
		} else if (edge.orient === "left") {
			ctx.moveTo(x, y);
			ctx.lineTo(x + rectWidth, y);
			ctx.lineTo(x + rectWidth + arrowWidth, y + rectHeight / 2);
			ctx.lineTo(x + rectWidth, y + rectHeight);
			ctx.lineTo(x, y + rectHeight);
			ctx.closePath();
		} else {
			ctx.rect(x, y, rectWidth, rectHeight);
		}
		ctx.fill();

		ctx.font = edge.coordinate.fontSize + "px " + edge.coordinate.fontFamily;
		ctx.fillStyle = edge.coordinate.textFill;
		ctx.textAlign = edge.coordinate.textAnchor === "middle" ? "center" : edge.coordinate.textAnchor;
		ctx.textBaseline = "middle";

		ctx.fillText(edge.coordinate.displayCoordinate, edge.coordinate.edgeXText, edge.coordinate.edgeYText);
	}
	if ((0, _utils.isDefined)(edge.line)) {
		ctx.strokeStyle = (0, _utils.hexToRGBA)(edge.line.stroke, edge.line.opacity);

		ctx.beginPath();
		ctx.moveTo(edge.line.x1, edge.line.y1);
		ctx.lineTo(edge.line.x2, edge.line.y2);
		ctx.stroke();
	}
};

exports.default = EdgeCoordinate;
//# sourceMappingURL=EdgeCoordinate.js.map