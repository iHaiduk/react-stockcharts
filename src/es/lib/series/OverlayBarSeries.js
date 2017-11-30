"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { merge } from "d3-array";

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../GenericChartComponent";
import { getAxisCanvas } from "../GenericComponent";

import { drawOnCanvas2, getBarsSVG2 } from "./StackedBarSeries";
import { isDefined, isNotDefined, first, last, functor } from "../utils";

var OverlayBarSeries = function (_Component) {
	_inherits(OverlayBarSeries, _Component);

	function OverlayBarSeries(props) {
		_classCallCheck(this, OverlayBarSeries);

		var _this = _possibleConstructorReturn(this, (OverlayBarSeries.__proto__ || Object.getPrototypeOf(OverlayBarSeries)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(OverlayBarSeries, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var yAccessor = this.props.yAccessor;
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;


			var bars = getBars(this.props, xAccessor, yAccessor, xScale, yScale, plotData);

			drawOnCanvas2(this.props, ctx, bars);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var yAccessor = this.props.yAccessor;
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;


			var bars = getBars(this.props, xAccessor, yAccessor, xScale, yScale, plotData);
			return _jsx("g", {
				className: "react-stockcharts-bar-series"
			}, void 0, getBarsSVG2(this.props, bars));
		}
	}, {
		key: "render",
		value: function render() {
			var clip = this.props.clip;


			return _jsx(GenericChartComponent, {
				svgDraw: this.renderSVG,
				canvasToDraw: getAxisCanvas,
				canvasDraw: this.drawOnCanvas,
				clip: clip,
				drawOn: ["pan"]
			});
		}
	}]);

	return OverlayBarSeries;
}(Component);

OverlayBarSeries.defaultProps = {
	baseAt: function baseAt(xScale, yScale /* , d*/) {
		return first(yScale.range());
	},
	direction: "up",
	className: "bar",
	stroke: false,
	fill: "#4682B4",
	opacity: 1,
	widthRatio: 0.5,
	clip: true
};

function getBars(props, xAccessor, yAccessor, xScale, yScale, plotData) {
	var baseAt = props.baseAt,
	    className = props.className,
	    fill = props.fill,
	    stroke = props.stroke,
	    widthRatio = props.widthRatio;


	var getClassName = functor(className);
	var getFill = functor(fill);
	var getBase = functor(baseAt);

	var width = Math.abs(xScale(xAccessor(last(plotData))) - xScale(xAccessor(first(plotData))));

	var bw = width / (plotData.length - 1) * widthRatio;
	var barWidth = Math.round(bw);
	var offset = barWidth === 1 ? 0 : 0.5 * bw;

	// console.log(xScale.domain(), yScale.domain());

	var bars = plotData.map(function (d) {
		// eslint-disable-next-line prefer-const
		var innerBars = yAccessor.map(function (eachYAccessor, i) {
			var yValue = eachYAccessor(d);
			if (isNotDefined(yValue)) return undefined;

			var xValue = xAccessor(d);
			var x = Math.round(xScale(xValue)) - offset;
			var y = yScale(yValue);
			// console.log(yValue, y, xValue, x)
			return {
				width: barWidth,
				x: x,
				y: y,
				className: getClassName(d, i),
				stroke: stroke ? getFill(d, i) : "none",
				fill: getFill(d, i),
				i: i
			};
		}).filter(function (yValue) {
			return isDefined(yValue);
		});

		var b = getBase(xScale, yScale, d);
		var h = void 0;
		for (var i = innerBars.length - 1; i >= 0; i--) {
			h = b - innerBars[i].y;
			if (h < 0) {
				innerBars[i].y = b;
				h = -1 * h;
			}
			innerBars[i].height = h;
			b = innerBars[i].y;
		}
		return innerBars;
	});

	return merge(bars);
}

export default OverlayBarSeries;
//# sourceMappingURL=OverlayBarSeries.js.map