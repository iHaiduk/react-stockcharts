"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../GenericChartComponent";

var Annotate = function (_Component) {
	_inherits(Annotate, _Component);

	function Annotate(props) {
		_classCallCheck(this, Annotate);

		var _this = _possibleConstructorReturn(this, (Annotate.__proto__ || Object.getPrototypeOf(Annotate)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(Annotate, [{
		key: "render",
		value: function render() {
			return _jsx(GenericChartComponent, {
				svgDraw: this.renderSVG,
				drawOn: ["pan"]
			});
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var xAccessor = moreProps.xAccessor;
			var xScale = moreProps.xScale,
			    yScale = moreProps.chartConfig.yScale,
			    plotData = moreProps.plotData;
			var _props = this.props,
			    className = _props.className,
			    usingProps = _props.usingProps,
			    Annotation = _props.with;

			var data = helper(this.props, plotData);

			return _jsx("g", {
				className: "react-stockcharts-enable-interaction " + className
			}, void 0, data.map(function (d, idx) {
				return React.createElement(Annotation, _extends({ key: idx
				}, usingProps, {
					xScale: xScale,
					yScale: yScale,
					xAccessor: xAccessor,
					plotData: plotData,
					datum: d }));
			}));
		}
	}]);

	return Annotate;
}(Component);

Annotate.defaultProps = {
	className: "react-stockcharts-annotate react-stockcharts-default-cursor"
};

function helper(_ref, plotData) {
	var when = _ref.when;

	return plotData.filter(when);
}

export default Annotate;
//# sourceMappingURL=Annotate.js.map