"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

import React from "react";
import PropTypes from "prop-types";

import LineSeries from "./LineSeries";
import AreaOnlySeries from "./AreaOnlySeries";

function AreaSeries(props) {
	var yAccessor = props.yAccessor,
	    baseAt = props.baseAt;
	var className = props.className,
	    opacity = props.opacity,
	    stroke = props.stroke,
	    strokeWidth = props.strokeWidth,
	    fill = props.fill;


	return _jsx("g", {
		className: className
	}, void 0, _jsx(LineSeries, {
		yAccessor: yAccessor,
		stroke: stroke,
		fill: "none",
		strokeWidth: strokeWidth,
		hoverHighlight: false
	}), _jsx(AreaOnlySeries, {
		yAccessor: yAccessor,
		base: baseAt,
		stroke: "none",
		fill: fill,
		opacity: opacity
	}));
}

AreaSeries.defaultProps = {
	stroke: "#4682B4",
	strokeWidth: 1,
	opacity: 0.5,
	fill: "#4682B4",
	className: "react-stockcharts-area"
};

export default AreaSeries;
//# sourceMappingURL=AreaSeries.js.map