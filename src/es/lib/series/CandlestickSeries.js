"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { nest } from "d3-collection";

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../GenericChartComponent";
import { getAxisCanvas } from "../GenericComponent";

import { hexToRGBA, isDefined, functor, plotDataLengthBarWidth, head } from "../utils";

var CandlestickSeries = function (_Component) {
	_inherits(CandlestickSeries, _Component);

	function CandlestickSeries(props) {
		_classCallCheck(this, CandlestickSeries);

		var _this = _possibleConstructorReturn(this, (CandlestickSeries.__proto__ || Object.getPrototypeOf(CandlestickSeries)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(CandlestickSeries, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			_drawOnCanvas(ctx, this.props, moreProps);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    className = _props.className,
			    wickClassName = _props.wickClassName,
			    candleClassName = _props.candleClassName;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData,
			    xAccessor = moreProps.xAccessor;


			var candleData = getCandleData(this.props, xAccessor, xScale, yScale, plotData);

			return _jsx("g", {
				className: className
			}, void 0, _jsx("g", {
				className: wickClassName
			}, "wicks", getWicksSVG(candleData)), _jsx("g", {
				className: candleClassName
			}, "candles", getCandlesSVG(this.props, candleData)));
		}
	}, {
		key: "render",
		value: function render() {
			var clip = this.props.clip;

			return _jsx(GenericChartComponent, {
				clip: clip,
				svgDraw: this.renderSVG,
				canvasDraw: this.drawOnCanvas,
				canvasToDraw: getAxisCanvas,
				drawOn: ["pan"]
			});
		}
	}]);

	return CandlestickSeries;
}(Component);

CandlestickSeries.defaultProps = {
	className: "react-stockcharts-candlestick",
	wickClassName: "react-stockcharts-candlestick-wick",
	candleClassName: "react-stockcharts-candlestick-candle",
	yAccessor: function yAccessor(d) {
		return { open: d.open, high: d.high, low: d.low, close: d.close };
	},
	classNames: function classNames(d) {
		return d.close > d.open ? "up" : "down";
	},
	width: plotDataLengthBarWidth,
	wickStroke: "#000000",
	// wickStroke: d => d.close > d.open ? "#6BA583" : "#FF0000",
	fill: function fill(d) {
		return d.close > d.open ? "#6BA583" : "#FF0000";
	},
	// stroke: d => d.close > d.open ? "#6BA583" : "#FF0000",
	stroke: "#000000",
	candleStrokeWidth: 0.5,
	// stroke: "none",
	widthRatio: 0.8,
	opacity: 0.5,
	clip: true
};

function getWicksSVG(candleData) {

	var wicks = candleData.map(function (each, idx) {
		var d = each.wick;
		return _jsx("path", {
			className: each.className,
			stroke: d.stroke,
			d: "M" + d.x + "," + d.y1 + " L" + d.x + "," + d.y2 + " M" + d.x + "," + d.y3 + " L" + d.x + "," + d.y4
		}, idx);
	});

	return wicks;
}

function getCandlesSVG(props, candleData) {

	/* eslint-disable react/prop-types */
	var opacity = props.opacity,
	    candleStrokeWidth = props.candleStrokeWidth;
	/* eslint-enable react/prop-types */

	var candles = candleData.map(function (d, idx) {
		if (d.width <= 1) return _jsx("line", {
			className: d.className,
			x1: d.x,
			y1: d.y,
			x2: d.x,
			y2: d.y + d.height,
			stroke: d.fill
		}, idx);else if (d.height === 0) return _jsx("line", {
			x1: d.x,
			y1: d.y,
			x2: d.x + d.width,
			y2: d.y + d.height,
			stroke: d.fill
		}, idx);
		return _jsx("rect", {
			className: d.className,
			fillOpacity: opacity,
			x: d.x,
			y: d.y,
			width: d.width,
			height: d.height,
			fill: d.fill,
			stroke: d.stroke,
			strokeWidth: candleStrokeWidth
		}, idx);
	});
	return candles;
}

function _drawOnCanvas(ctx, props, moreProps) {
	var opacity = props.opacity,
	    candleStrokeWidth = props.candleStrokeWidth;
	var xScale = moreProps.xScale,
	    yScale = moreProps.chartConfig.yScale,
	    plotData = moreProps.plotData,
	    xAccessor = moreProps.xAccessor;

	// const wickData = getWickData(props, xAccessor, xScale, yScale, plotData);

	var candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);

	var wickNest = nest().key(function (d) {
		return d.wick.stroke;
	}).entries(candleData);

	wickNest.forEach(function (outer) {
		var key = outer.key,
		    values = outer.values;

		ctx.strokeStyle = key;
		ctx.fillStyle = key;
		values.forEach(function (each) {
			/*
   ctx.moveTo(d.x, d.y1);
   ctx.lineTo(d.x, d.y2);
   	ctx.beginPath();
   ctx.moveTo(d.x, d.y3);
   ctx.lineTo(d.x, d.y4);
   ctx.stroke(); */
			var d = each.wick;

			ctx.fillRect(d.x - 0.5, d.y1, 1, d.y2 - d.y1);
			ctx.fillRect(d.x - 0.5, d.y3, 1, d.y4 - d.y3);
		});
	});

	// const candleData = getCandleData(props, xAccessor, xScale, yScale, plotData);

	var candleNest = nest().key(function (d) {
		return d.stroke;
	}).key(function (d) {
		return d.fill;
	}).entries(candleData);

	candleNest.forEach(function (outer) {
		var strokeKey = outer.key,
		    strokeValues = outer.values;

		if (strokeKey !== "none") {
			ctx.strokeStyle = strokeKey;
			ctx.lineWidth = candleStrokeWidth;
		}
		strokeValues.forEach(function (inner) {
			var key = inner.key,
			    values = inner.values;

			var fillStyle = head(values).width <= 1 ? key : hexToRGBA(key, opacity);
			ctx.fillStyle = fillStyle;

			values.forEach(function (d) {
				if (d.width <= 1) {
					// <line className={d.className} key={idx} x1={d.x} y1={d.y} x2={d.x} y2={d.y + d.height}/>
					/*
     ctx.beginPath();
     ctx.moveTo(d.x, d.y);
     ctx.lineTo(d.x, d.y + d.height);
     ctx.stroke();
     */
					ctx.fillRect(d.x - 0.5, d.y, 1, d.height);
				} else if (d.height === 0) {
					// <line key={idx} x1={d.x} y1={d.y} x2={d.x + d.width} y2={d.y + d.height} />
					/*
     ctx.beginPath();
     ctx.moveTo(d.x, d.y);
     ctx.lineTo(d.x + d.width, d.y + d.height);
     ctx.stroke();
     */
					ctx.fillRect(d.x, d.y - 0.5, d.width, 1);
				} else {
					/*
     ctx.beginPath();
     ctx.rect(d.x, d.y, d.width, d.height);
     ctx.closePath();
     ctx.fill();
     if (strokeKey !== "none") ctx.stroke();
     */
					ctx.fillRect(d.x, d.y, d.width, d.height);
					if (strokeKey !== "none") ctx.strokeRect(d.x, d.y, d.width, d.height);
				}
			});
		});
	});
}
/*
function getWickData(props, xAccessor, xScale, yScale, plotData) {

	const { classNames: classNameProp, wickStroke: wickStrokeProp, yAccessor } = props;
	const wickStroke = functor(wickStrokeProp);
	const className = functor(classNameProp);
	const wickData = plotData
			.filter(d => isDefined(yAccessor(d).close))
			.map(d => {
				// console.log(yAccessor);
				const ohlc = yAccessor(d);

				const x = Math.round(xScale(xAccessor(d))),
					y1 = yScale(ohlc.high),
					y2 = yScale(Math.max(ohlc.open, ohlc.close)),
					y3 = yScale(Math.min(ohlc.open, ohlc.close)),
					y4 = yScale(ohlc.low);

				return {
					x,
					y1,
					y2,
					y3,
					y4,
					className: className(ohlc),
					direction: (ohlc.close - ohlc.open),
					stroke: wickStroke(ohlc),
				};
			});
	return wickData;
}
*/

function getCandleData(props, xAccessor, xScale, yScale, plotData) {
	var wickStrokeProp = props.wickStroke;

	var wickStroke = functor(wickStrokeProp);

	var classNames = props.classNames,
	    fillProp = props.fill,
	    strokeProp = props.stroke,
	    yAccessor = props.yAccessor;

	var className = functor(classNames);

	var fill = functor(fillProp);
	var stroke = functor(strokeProp);

	var widthFunctor = functor(props.width);
	var width = widthFunctor(props, {
		xScale: xScale,
		xAccessor: xAccessor,
		plotData: plotData
	});

	/*
 const candleWidth = Math.round(width);
 const offset = Math.round(candleWidth === 1 ? 0 : 0.5 * width);
 */
	var trueOffset = 0.5 * width;
	var offset = trueOffset > 0.7 ? Math.round(trueOffset) : Math.floor(trueOffset);

	// eslint-disable-next-line prefer-const
	var candles = [];

	for (var i = 0; i < plotData.length; i++) {
		var d = plotData[i];
		if (isDefined(yAccessor(d).close)) {
			var x = Math.round(xScale(xAccessor(d)));
			// const x = Math.round(xScale(xAccessor(d)) - offset);

			var ohlc = yAccessor(d);
			var y = Math.round(yScale(Math.max(ohlc.open, ohlc.close)));
			var height = Math.round(Math.abs(yScale(ohlc.open) - yScale(ohlc.close)));

			candles.push({
				// type: "line"
				x: x - offset,
				y: y,
				wick: {
					stroke: wickStroke(ohlc),
					x: x,
					y1: Math.round(yScale(ohlc.high)),
					y2: y,
					y3: y + height, // Math.round(yScale(Math.min(ohlc.open, ohlc.close))),
					y4: Math.round(yScale(ohlc.low))
				},
				height: height,
				width: offset * 2,
				className: className(ohlc),
				fill: fill(ohlc),
				stroke: stroke(ohlc),
				direction: ohlc.close - ohlc.open
			});
		}
	}

	return candles;
}

export default CandlestickSeries;
//# sourceMappingURL=CandlestickSeries.js.map