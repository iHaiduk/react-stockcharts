"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { format } from "d3-format";
import React, { Component } from "react";
import PropTypes from "prop-types";
import displayValuesFor from "./displayValuesFor";
import GenericChartComponent from "../GenericChartComponent";

import { functor } from "../utils";

import ToolTipText from "./ToolTipText";
import ToolTipTSpanLabel from "./ToolTipTSpanLabel";

var StochasticTooltip = function (_Component) {
	_inherits(StochasticTooltip, _Component);

	function StochasticTooltip(props) {
		_classCallCheck(this, StochasticTooltip);

		var _this = _possibleConstructorReturn(this, (StochasticTooltip.__proto__ || Object.getPrototypeOf(StochasticTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(StochasticTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    onClick = _props.onClick,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    yAccessor = _props.yAccessor,
			    displayFormat = _props.displayFormat,
			    label = _props.label;
			var _props2 = this.props,
			    className = _props2.className,
			    options = _props2.options,
			    appearance = _props2.appearance,
			    labelFill = _props2.labelFill;
			var displayValuesFor = this.props.displayValuesFor;
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;


			var currentItem = displayValuesFor(this.props, moreProps);
			var stroke = appearance.stroke;

			var stochastic = currentItem && yAccessor(currentItem);

			var K = stochastic && stochastic.K && displayFormat(stochastic.K) || "n/a";
			var D = stochastic && stochastic.D && displayFormat(stochastic.D) || "n/a";

			var originProp = this.props.origin;

			var origin = functor(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			return _jsx("g", {
				className: className,
				transform: "translate(" + x + ", " + y + ")",
				onClick: onClick
			}, void 0, _jsx(ToolTipText, {
				x: 0,
				y: 0,
				fontFamily: fontFamily,
				fontSize: fontSize
			}, void 0, _jsx(ToolTipTSpanLabel, {
				fill: labelFill
			}, void 0, label + " %K("), _jsx("tspan", {
				fill: stroke.kLine
			}, void 0, options.windowSize + ", " + options.kWindowSize), _jsx(ToolTipTSpanLabel, {
				fill: labelFill
			}, void 0, "): "), _jsx("tspan", {
				fill: stroke.kLine
			}, void 0, K), _jsx(ToolTipTSpanLabel, {
				fill: labelFill
			}, void 0, " %D ("), _jsx("tspan", {
				fill: stroke.dLine
			}, void 0, options.dWindowSize), _jsx(ToolTipTSpanLabel, {
				fill: labelFill
			}, void 0, "): "), _jsx("tspan", {
				fill: stroke.dLine
			}, void 0, D)));
		}
	}, {
		key: "render",
		value: function render() {
			return _jsx(GenericChartComponent, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return StochasticTooltip;
}(Component);

StochasticTooltip.defaultProps = {
	displayFormat: format(".2f"),
	displayValuesFor: displayValuesFor,
	origin: [0, 0],
	className: "react-stockcharts-tooltip",
	label: "STO"
};

export default StochasticTooltip;
//# sourceMappingURL=StochasticTooltip.js.map