"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _d3Format = require("d3-format");

var _d3TimeFormat = require("d3-time-format");

var _displayValuesFor = require("./displayValuesFor");

var _displayValuesFor2 = _interopRequireDefault(_displayValuesFor);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _utils = require("../utils");

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OHLCTooltip = function (_Component) {
	_inherits(OHLCTooltip, _Component);

	function OHLCTooltip(props) {
		_classCallCheck(this, OHLCTooltip);

		var _this = _possibleConstructorReturn(this, (OHLCTooltip.__proto__ || Object.getPrototypeOf(OHLCTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(OHLCTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var displayValuesFor = this.props.displayValuesFor;
			var _props = this.props,
			    xDisplayFormat = _props.xDisplayFormat,
			    accessor = _props.accessor,
			    volumeFormat = _props.volumeFormat,
			    ohlcFormat = _props.ohlcFormat,
			    percentFormat = _props.percentFormat,
			    displayTexts = _props.displayTexts;
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;
			var displayXAccessor = moreProps.displayXAccessor;


			var currentItem = displayValuesFor(this.props, moreProps);

			var displayDate = void 0,
			    open = void 0,
			    high = void 0,
			    low = void 0,
			    close = void 0,
			    volume = void 0,
			    percent = void 0;
			displayDate = open = high = low = close = volume = percent = displayTexts.na;

			if ((0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(accessor(currentItem))) {
				var item = accessor(currentItem);
				volume = (0, _utils.isDefined)(item.volume) ? volumeFormat(item.volume) : displayTexts.na;

				displayDate = xDisplayFormat(displayXAccessor(item));
				open = ohlcFormat(item.open);
				high = ohlcFormat(item.high);
				low = ohlcFormat(item.low);
				close = ohlcFormat(item.close);
				percent = percentFormat((item.close - item.open) / item.open);
			}

			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			var itemsToDisplay = {
				displayDate: displayDate,
				open: open,
				high: high,
				low: low,
				close: close,
				percent: percent,
				volume: volume,
				x: x,
				y: y
			};
			return this.props.children(this.props, moreProps, itemsToDisplay);
		}
	}, {
		key: "render",
		value: function render() {
			return _jsx(_GenericChartComponent2.default, {
				clip: false,
				svgDraw: this.renderSVG,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return OHLCTooltip;
}(_react.Component);

var displayTextsDefault = {
	d: "Date: ",
	o: " O: ",
	h: " H: ",
	l: " L: ",
	c: " C: ",
	v: " Vol: ",
	na: "n/a"
};

OHLCTooltip.defaultProps = {
	accessor: function accessor(d) {
		return {
			date: d.date,
			open: d.open,
			high: d.high,
			low: d.low,
			close: d.close,
			volume: d.volume
		};
	},
	xDisplayFormat: (0, _d3TimeFormat.timeFormat)("%Y-%m-%d"),
	volumeFormat: (0, _d3Format.format)(".4s"),
	percentFormat: (0, _d3Format.format)(".2%"),
	ohlcFormat: (0, _d3Format.format)(".2f"),
	displayValuesFor: _displayValuesFor2.default,
	origin: [0, 0],
	children: defaultDisplay,
	displayTexts: displayTextsDefault
};

function defaultDisplay(props, moreProps, itemsToDisplay) {

	/* eslint-disable */
	var className = props.className,
	    textFill = props.textFill,
	    labelFill = props.labelFill,
	    onClick = props.onClick,
	    fontFamily = props.fontFamily,
	    fontSize = props.fontSize,
	    displayTexts = props.displayTexts;
	/* eslint-enable */

	var displayDate = itemsToDisplay.displayDate,
	    open = itemsToDisplay.open,
	    high = itemsToDisplay.high,
	    low = itemsToDisplay.low,
	    close = itemsToDisplay.close,
	    volume = itemsToDisplay.volume,
	    x = itemsToDisplay.x,
	    y = itemsToDisplay.y;

	return _jsx("g", {
		className: "react-stockcharts-tooltip-hover " + className,
		transform: "translate(" + x + ", " + y + ")",
		onClick: onClick
	}, void 0, _jsx(_ToolTipText2.default, {
		x: 0,
		y: 0,
		fontFamily: fontFamily,
		fontSize: fontSize
	}, void 0, _jsx(_ToolTipTSpanLabel2.default, {
		fill: labelFill,
		x: 0,
		dy: "5"
	}, "label", displayTexts.d), _jsx("tspan", {
		fill: textFill
	}, "value", displayDate), _jsx(_ToolTipTSpanLabel2.default, {
		fill: labelFill
	}, "label_O", displayTexts.o), _jsx("tspan", {
		fill: textFill
	}, "value_O", open), _jsx(_ToolTipTSpanLabel2.default, {
		fill: labelFill
	}, "label_H", displayTexts.h), _jsx("tspan", {
		fill: textFill
	}, "value_H", high), _jsx(_ToolTipTSpanLabel2.default, {
		fill: labelFill
	}, "label_L", displayTexts.l), _jsx("tspan", {
		fill: textFill
	}, "value_L", low), _jsx(_ToolTipTSpanLabel2.default, {
		fill: labelFill
	}, "label_C", displayTexts.c), _jsx("tspan", {
		fill: textFill
	}, "value_C", close), _jsx(_ToolTipTSpanLabel2.default, {
		fill: labelFill
	}, "label_Vol", displayTexts.v), _jsx("tspan", {
		fill: textFill
	}, "value_Vol", volume)));
}

exports.default = OHLCTooltip;
//# sourceMappingURL=OHLCTooltip.js.map