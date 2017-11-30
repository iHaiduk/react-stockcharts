"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";
import { functor } from "../utils";

var LabelAnnotation = function (_Component) {
	_inherits(LabelAnnotation, _Component);

	function LabelAnnotation(props) {
		_classCallCheck(this, LabelAnnotation);

		var _this = _possibleConstructorReturn(this, (LabelAnnotation.__proto__ || Object.getPrototypeOf(LabelAnnotation)).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(LabelAnnotation, [{
		key: "handleClick",
		value: function handleClick(e) {
			var onClick = this.props.onClick;


			if (onClick) {
				var _props = this.props,
				    xScale = _props.xScale,
				    yScale = _props.yScale,
				    datum = _props.datum;

				onClick({ xScale: xScale, yScale: yScale, datum: datum }, e);
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    className = _props2.className,
			    textAnchor = _props2.textAnchor,
			    fontFamily = _props2.fontFamily,
			    fontSize = _props2.fontSize,
			    opacity = _props2.opacity,
			    rotate = _props2.rotate;
			var _props3 = this.props,
			    xAccessor = _props3.xAccessor,
			    xScale = _props3.xScale,
			    yScale = _props3.yScale;

			var _helper = helper(this.props, xAccessor, xScale, yScale),
			    xPos = _helper.xPos,
			    yPos = _helper.yPos,
			    fill = _helper.fill,
			    text = _helper.text,
			    tooltip = _helper.tooltip;

			return _jsx("g", {
				className: className
			}, void 0, _jsx("title", {}, void 0, tooltip), _jsx("text", {
				x: xPos,
				y: yPos,
				fontFamily: fontFamily,
				fontSize: fontSize,
				fill: fill,
				opacity: opacity,
				transform: "rotate(" + rotate + ", " + xPos + ", " + yPos + ")",
				onClick: this.handleClick,
				textAnchor: textAnchor
			}, void 0, text));
		}
	}]);

	return LabelAnnotation;
}(Component);

export function helper(props, xAccessor, xScale, yScale) {
	var x = props.x,
	    y = props.y,
	    datum = props.datum,
	    fill = props.fill,
	    text = props.text,
	    tooltip = props.tooltip,
	    plotData = props.plotData;


	var xFunc = functor(x);
	var yFunc = functor(y);

	var _ref = [xFunc({ xScale: xScale, xAccessor: xAccessor, datum: datum, plotData: plotData }), yFunc({ yScale: yScale, datum: datum, plotData: plotData })],
	    xPos = _ref[0],
	    yPos = _ref[1];


	return {
		xPos: xPos,
		yPos: yPos,
		text: functor(text)(datum),
		fill: functor(fill)(datum),
		tooltip: functor(tooltip)(datum)
	};
}

export var defaultProps = {
	textAnchor: "middle",
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 12,
	fill: "#000000",
	opacity: 1,
	rotate: 0,
	x: function x(_ref2) {
		var xScale = _ref2.xScale,
		    xAccessor = _ref2.xAccessor,
		    datum = _ref2.datum;
		return xScale(xAccessor(datum));
	}
};

LabelAnnotation.defaultProps = _extends({}, defaultProps, {
	className: "react-stockcharts-labelannotation"
});

export default LabelAnnotation;
//# sourceMappingURL=LabelAnnotation.js.map