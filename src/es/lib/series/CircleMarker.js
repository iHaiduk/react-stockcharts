"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

import React from "react";
import PropTypes from "prop-types";

import { hexToRGBA, functor } from "../utils";

function Circle(props) {
	var className = props.className,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    opacity = props.opacity,
	    fill = props.fill,
	    point = props.point,
	    r = props.r;

	var radius = functor(r)(point.datum);
	return _jsx("circle", {
		className: className,
		cx: point.x,
		cy: point.y,
		stroke: stroke,
		strokeWidth: strokeWidth,
		fillOpacity: opacity,
		fill: fill,
		r: radius
	});
}

Circle.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-marker-circle"
};

Circle.drawOnCanvas = function (props, point, ctx) {
	var stroke = props.stroke,
	    fill = props.fill,
	    opacity = props.opacity,
	    strokeWidth = props.strokeWidth;


	ctx.strokeStyle = stroke;
	ctx.lineWidth = strokeWidth;

	if (fill !== "none") {
		ctx.fillStyle = hexToRGBA(fill, opacity);
	}

	Circle.drawOnCanvasWithNoStateChange(props, point, ctx);
};

Circle.drawOnCanvasWithNoStateChange = function (props, point, ctx) {
	var r = props.r;

	var radius = functor(r)(point.datum);

	ctx.moveTo(point.x, point.y);
	ctx.beginPath();
	ctx.arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
	ctx.stroke();
	ctx.fill();
};

export default Circle;
//# sourceMappingURL=CircleMarker.js.map