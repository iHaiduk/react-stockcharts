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

var _displayValuesFor = require("./displayValuesFor");

var _displayValuesFor2 = _interopRequireDefault(_displayValuesFor);

var _GenericChartComponent = require("../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _ToolTipText = require("./ToolTipText");

var _ToolTipText2 = _interopRequireDefault(_ToolTipText);

var _ToolTipTSpanLabel = require("./ToolTipTSpanLabel");

var _ToolTipTSpanLabel2 = _interopRequireDefault(_ToolTipTSpanLabel);

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SingleValueTooltip = function (_Component) {
	_inherits(SingleValueTooltip, _Component);

	function SingleValueTooltip(props) {
		_classCallCheck(this, SingleValueTooltip);

		var _this = _possibleConstructorReturn(this, (SingleValueTooltip.__proto__ || Object.getPrototypeOf(SingleValueTooltip)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		return _this;
	}

	_createClass(SingleValueTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props = this.props,
			    onClick = _props.onClick,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    labelFill = _props.labelFill,
			    valueFill = _props.valueFill,
			    className = _props.className;
			var _props2 = this.props,
			    xDisplayFormat = _props2.xDisplayFormat,
			    yDisplayFormat = _props2.yDisplayFormat,
			    xLabel = _props2.xLabel,
			    yLabel = _props2.yLabel,
			    xAccessor = _props2.xAccessor,
			    yAccessor = _props2.yAccessor;
			var displayValuesFor = this.props.displayValuesFor;
			var _moreProps$chartConfi = moreProps.chartConfig,
			    width = _moreProps$chartConfi.width,
			    height = _moreProps$chartConfi.height;

			var currentItem = displayValuesFor(this.props, moreProps);

			var xDisplayValue = (0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(xAccessor(currentItem)) ? xDisplayFormat(xAccessor(currentItem)) : "n/a";
			var yDisplayValue = (0, _utils.isDefined)(currentItem) && (0, _utils.isDefined)(yAccessor(currentItem)) ? yDisplayFormat(yAccessor(currentItem)) : "n/a";

			var originProp = this.props.origin;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			return _jsx("g", {
				className: className,
				transform: "translate(" + x + ", " + y + ")",
				onClick: onClick
			}, void 0, _jsx(_ToolTipText2.default, {
				x: 0,
				y: 0,
				fontFamily: fontFamily,
				fontSize: fontSize
			}, void 0, xLabel ? _jsx(_ToolTipTSpanLabel2.default, {
				x: 0,
				dy: "5",
				fill: labelFill
			}, void 0, xLabel + ": ") : null, xLabel ? _jsx("tspan", {
				fill: valueFill
			}, void 0, xDisplayValue + " ") : null, _jsx(_ToolTipTSpanLabel2.default, {
				fill: labelFill
			}, void 0, yLabel + ": "), _jsx("tspan", {
				fill: valueFill
			}, void 0, yDisplayValue)));
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

	return SingleValueTooltip;
}(_react.Component);

SingleValueTooltip.defaultProps = {
	origin: [0, 0],
	labelFill: "#4682B4",
	valueFill: "#000000",
	yDisplayFormat: (0, _d3Format.format)(".2f"),
	displayValuesFor: _displayValuesFor2.default,
	xAccessor: _utils.noop,
	yAccessor: _utils.identity,
	className: "react-stockcharts-tooltip"
};

exports.default = SingleValueTooltip;
//# sourceMappingURL=SingleValueTooltip.js.map