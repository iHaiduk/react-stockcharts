"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var SingleMAToolTip = function (_Component) {
	_inherits(SingleMAToolTip, _Component);

	function SingleMAToolTip(props) {
		_classCallCheck(this, SingleMAToolTip);

		var _this = _possibleConstructorReturn(this, (SingleMAToolTip.__proto__ || Object.getPrototypeOf(SingleMAToolTip)).call(this, props));

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(SingleMAToolTip, [{
		key: "handleClick",
		value: function handleClick(e) {
			var _props = this.props,
			    onClick = _props.onClick,
			    forChart = _props.forChart,
			    options = _props.options;

			onClick(_extends({ chartId: forChart }, options), e);
		}
	}, {
		key: "render",
		value: function render() {
			var _props2 = this.props,
			    textFill = _props2.textFill,
			    labelFill = _props2.labelFill;

			var translate = "translate(" + this.props.origin[0] + ", " + this.props.origin[1] + ")";
			return _jsx("g", {
				transform: translate
			}, void 0, _jsx("line", {
				x1: 0,
				y1: 2,
				x2: 0,
				y2: 28,
				stroke: this.props.color,
				strokeWidth: "4px"
			}), _jsx(_ToolTipText2.default, {
				x: 5,
				y: 11,
				fontFamily: this.props.fontFamily,
				fontSize: this.props.fontSize
			}, void 0, _jsx(_ToolTipTSpanLabel2.default, {
				fill: labelFill
			}, void 0, this.props.displayName), _jsx("tspan", {
				x: "5",
				dy: "15",
				fill: textFill
			}, void 0, this.props.value)), _jsx("rect", {
				x: 0,
				y: 0,
				width: 55,
				height: 30,
				onClick: this.handleClick,
				fill: "none",
				stroke: "none"
			}));
		}
	}]);

	return SingleMAToolTip;
}(_react.Component);

var MovingAverageTooltip = function (_Component2) {
	_inherits(MovingAverageTooltip, _Component2);

	function MovingAverageTooltip(props) {
		_classCallCheck(this, MovingAverageTooltip);

		var _this2 = _possibleConstructorReturn(this, (MovingAverageTooltip.__proto__ || Object.getPrototypeOf(MovingAverageTooltip)).call(this, props));

		_this2.renderSVG = _this2.renderSVG.bind(_this2);
		return _this2;
	}

	_createClass(MovingAverageTooltip, [{
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var displayValuesFor = this.props.displayValuesFor;
			var chartId = moreProps.chartId;
			var chartConfig = moreProps.chartConfig;
			var _props3 = this.props,
			    className = _props3.className,
			    onClick = _props3.onClick,
			    width = _props3.width,
			    fontFamily = _props3.fontFamily,
			    fontSize = _props3.fontSize,
			    textFill = _props3.textFill,
			    labelFill = _props3.labelFill;
			var _props4 = this.props,
			    originProp = _props4.origin,
			    displayFormat = _props4.displayFormat,
			    options = _props4.options;
			var height = moreProps.chartConfig.height;


			var currentItem = displayValuesFor(this.props, moreProps);
			var config = chartConfig;

			var origin = (0, _utils.functor)(originProp);

			var _origin = origin(width, height),
			    _origin2 = _slicedToArray(_origin, 2),
			    x = _origin2[0],
			    y = _origin2[1];

			var _config$origin = _slicedToArray(config.origin, 2),
			    ox = _config$origin[0],
			    oy = _config$origin[1];

			return _jsx("g", {
				transform: "translate(" + (ox + x) + ", " + (oy + y) + ")",
				className: className
			}, void 0, options.map(function (each, idx) {
				var yValue = currentItem && each.yAccessor(currentItem);

				var tooltipLabel = each.type + " (" + each.windowSize + ")";
				var yDisplayValue = yValue ? displayFormat(yValue) : "n/a";
				return _jsx(SingleMAToolTip, {
					origin: [width * idx, 0],
					color: each.stroke,
					displayName: tooltipLabel,
					value: yDisplayValue,
					options: each,
					forChart: chartId,
					onClick: onClick,
					fontFamily: fontFamily,
					fontSize: fontSize,
					textFill: textFill,
					labelFill: labelFill
				}, idx);
			}));
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

	return MovingAverageTooltip;
}(_react.Component);

MovingAverageTooltip.defaultProps = {
	className: "react-stockcharts-tooltip react-stockcharts-moving-average-tooltip",
	displayFormat: (0, _d3Format.format)(".2f"),
	displayValuesFor: _displayValuesFor2.default,
	origin: [0, 10],
	width: 65
};

exports.default = MovingAverageTooltip;
//# sourceMappingURL=MovingAverageTooltip.js.map