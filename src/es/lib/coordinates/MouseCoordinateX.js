"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { drawOnCanvas as _drawOnCanvas, renderSVG as _renderSVG } from "./EdgeCoordinateV3";
import GenericChartComponent from "../GenericChartComponent";
import { getMouseCanvas } from "../GenericComponent";

import { isNotDefined } from "../utils";

var MouseCoordinateX = function (_Component) {
	_inherits(MouseCoordinateX, _Component);

	function MouseCoordinateX(props) {
		_classCallCheck(this, MouseCoordinateX);

		var _this = _possibleConstructorReturn(this, (MouseCoordinateX.__proto__ || Object.getPrototypeOf(MouseCoordinateX)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(MouseCoordinateX, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var props = helper(this.props, moreProps);
			if (isNotDefined(props)) return null;

			_drawOnCanvas(ctx, props);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var props = helper(this.props, moreProps);
			if (isNotDefined(props)) return null;

			return _renderSVG(props);
		}
	}, {
		key: "render",
		value: function render() {
			return _jsx(GenericChartComponent, {
				svgDraw: this.renderSVG,
				clip: false,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: getMouseCanvas,
				drawOn: ["mousemove", "pan", "drag"]
			});
		}
	}]);

	return MouseCoordinateX;
}(Component);

function customX(props, moreProps) {
	var xScale = moreProps.xScale,
	    xAccessor = moreProps.xAccessor,
	    currentItem = moreProps.currentItem,
	    mouseXY = moreProps.mouseXY;
	var snapX = props.snapX;

	var x = snapX ? xScale(xAccessor(currentItem)) : mouseXY[0];

	var displayXAccessor = moreProps.displayXAccessor;
	var displayFormat = props.displayFormat;

	var coordinate = snapX ? displayFormat(displayXAccessor(currentItem)) : displayFormat(xScale.invert(x));
	return { x: x, coordinate: coordinate };
}

MouseCoordinateX.defaultProps = {
	yAxisPad: 0,
	rectWidth: 80,
	rectHeight: 20,

	// rectRadius: 5,
	// stroke: "#684F1D",
	strokeOpacity: 1,
	strokeWidth: 1,

	orient: "bottom",
	at: "bottom",

	fill: "#525252",
	opacity: 1,
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 13,
	textFill: "#FFFFFF",
	snapX: true,
	customX: customX
};

function helper(props, moreProps) {
	var show = moreProps.show,
	    currentItem = moreProps.currentItem;
	var height = moreProps.chartConfig.height;


	if (isNotDefined(currentItem)) return null;

	var customX = props.customX;
	var orient = props.orient,
	    at = props.at;
	var stroke = props.stroke,
	    strokeOpacity = props.strokeOpacity,
	    strokeWidth = props.strokeWidth;
	var rectRadius = props.rectRadius,
	    rectWidth = props.rectWidth,
	    rectHeight = props.rectHeight;
	var fill = props.fill,
	    opacity = props.opacity,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    textFill = props.textFill;


	var edgeAt = at === "bottom" ? height : 0;

	var _customX = customX(props, moreProps),
	    x = _customX.x,
	    coordinate = _customX.coordinate;

	var type = "vertical";
	var y1 = 0,
	    y2 = height;
	var hideLine = true;

	var coordinateProps = {
		coordinate: coordinate,
		show: show,
		type: type,
		orient: orient,
		edgeAt: edgeAt,
		hideLine: hideLine,
		fill: fill, opacity: opacity, fontFamily: fontFamily, fontSize: fontSize, textFill: textFill,
		stroke: stroke, strokeOpacity: strokeOpacity, strokeWidth: strokeWidth,
		rectWidth: rectWidth,
		rectHeight: rectHeight,
		rectRadius: rectRadius,
		arrowWidth: 0,
		x1: x,
		x2: x,
		y1: y1,
		y2: y2
	};
	return coordinateProps;
}

export default MouseCoordinateX;
//# sourceMappingURL=MouseCoordinateX.js.map