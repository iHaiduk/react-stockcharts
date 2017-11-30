"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import BarSeries from "./BarSeries";
import LineSeries from "./LineSeries";
import StraightLine from "./StraightLine";

var MACDSeries = function (_Component) {
	_inherits(MACDSeries, _Component);

	function MACDSeries(props) {
		_classCallCheck(this, MACDSeries);

		var _this = _possibleConstructorReturn(this, (MACDSeries.__proto__ || Object.getPrototypeOf(MACDSeries)).call(this, props));

		_this.yAccessorForMACD = _this.yAccessorForMACD.bind(_this);
		_this.yAccessorForSignal = _this.yAccessorForSignal.bind(_this);
		_this.yAccessorForDivergence = _this.yAccessorForDivergence.bind(_this);
		_this.yAccessorForDivergenceBase = _this.yAccessorForDivergenceBase.bind(_this);
		return _this;
	}

	_createClass(MACDSeries, [{
		key: "yAccessorForMACD",
		value: function yAccessorForMACD(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && yAccessor(d).macd;
		}
	}, {
		key: "yAccessorForSignal",
		value: function yAccessorForSignal(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && yAccessor(d).signal;
		}
	}, {
		key: "yAccessorForDivergence",
		value: function yAccessorForDivergence(d) {
			var yAccessor = this.props.yAccessor;

			return yAccessor(d) && yAccessor(d).divergence;
		}
	}, {
		key: "yAccessorForDivergenceBase",
		value: function yAccessorForDivergenceBase(xScale, yScale /* , d */) {
			return yScale(0);
		}
	}, {
		key: "render",
		value: function render() {
			var _props = this.props,
			    className = _props.className,
			    opacity = _props.opacity,
			    divergenceStroke = _props.divergenceStroke;
			var _props2 = this.props,
			    stroke = _props2.stroke,
			    fill = _props2.fill;
			var clip = this.props.clip;
			var _props3 = this.props,
			    zeroLineStroke = _props3.zeroLineStroke,
			    zeroLineOpacity = _props3.zeroLineOpacity;


			return _jsx("g", {
				className: className
			}, void 0, _jsx(BarSeries, {
				baseAt: this.yAccessorForDivergenceBase,
				className: "macd-divergence",
				widthRatio: 0.5,
				stroke: divergenceStroke,
				fill: fill.divergence,
				opacity: opacity,
				clip: clip,
				yAccessor: this.yAccessorForDivergence
			}), _jsx(LineSeries, {
				yAccessor: this.yAccessorForMACD,
				stroke: stroke.macd,
				fill: "none"
			}), _jsx(LineSeries, {
				yAccessor: this.yAccessorForSignal,
				stroke: stroke.signal,
				fill: "none"
			}), _jsx(StraightLine, {
				stroke: zeroLineStroke,
				opacity: zeroLineOpacity,
				yValue: 0
			}));
		}
	}]);

	return MACDSeries;
}(Component);

MACDSeries.defaultProps = {
	className: "react-stockcharts-macd-series",
	zeroLineStroke: "#000000",
	zeroLineOpacity: 0.3,
	opacity: 0.6,
	divergenceStroke: false,
	clip: true
};

export default MACDSeries;
//# sourceMappingURL=MACDSeries.js.map