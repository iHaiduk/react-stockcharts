var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import GenericChartComponent from "../../GenericChartComponent";
import { getMouseCanvas } from "../../GenericComponent";
import { isDefined, hexToRGBA } from "../../utils";

var PADDING = 10;

var HoverTextNearMouse = function (_Component) {
	_inherits(HoverTextNearMouse, _Component);

	function HoverTextNearMouse(props) {
		_classCallCheck(this, HoverTextNearMouse);

		var _this = _possibleConstructorReturn(this, (HoverTextNearMouse.__proto__ || Object.getPrototypeOf(HoverTextNearMouse)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		return _this;
	}

	_createClass(HoverTextNearMouse, [{
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    fill = _props.fill,
			    bgFill = _props.bgFill,
			    bgOpacity = _props.bgOpacity;

			// console.log(moreProps)

			var textMetaData = helper(this.props, moreProps);

			if (isDefined(textMetaData)) {
				var rect = textMetaData.rect,
				    text = textMetaData.text;


				ctx.strokeStyle = bgFill;
				ctx.fillStyle = hexToRGBA(bgFill, bgOpacity);
				ctx.beginPath();
				ctx.rect(rect.x, rect.y, rect.width, rect.height);
				ctx.fill();
				ctx.stroke();

				ctx.font = fontSize + "px " + fontFamily;
				ctx.fillStyle = fill;
				ctx.beginPath();

				ctx.fillText(text.text, text.x, text.y);
			}
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			var _props2 = this.props,
			    fontFamily = _props2.fontFamily,
			    fontSize = _props2.fontSize,
			    fill = _props2.fill,
			    bgFill = _props2.bgFill,
			    bgOpacity = _props2.bgOpacity;

			// console.log(moreProps)

			var textMetaData = helper(this.props, moreProps);

			if (isDefined(textMetaData)) {
				var rect = textMetaData.rect,
				    text = textMetaData.text;


				return _jsx("g", {}, void 0, React.createElement("rect", _extends({
					fill: bgFill,
					fillOpacity: bgOpacity,
					stroke: bgFill
				}, rect)), _jsx("text", {
					fontSize: fontSize,
					fontFamily: fontFamily,
					textAnchor: "start",
					fill: fill,
					x: text.x,
					y: text.y
				}, void 0, text.text));
			}
		}
	}, {
		key: "render",
		value: function render() {

			return _jsx(GenericChartComponent, {
				foo: true,
				svgDraw: this.renderSVG,
				canvasToDraw: getMouseCanvas,
				canvasDraw: this.drawOnCanvas,
				drawOn: ["mousemove"]
			});
		}
	}]);

	return HoverTextNearMouse;
}(Component);

HoverTextNearMouse.defaultProps = {
	fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
	fontSize: 12,
	fill: "#000000",
	bgFill: "#FA9325",
	bgOpacity: 0.5
};

function helper(props, moreProps) {
	var show = props.show,
	    fontSize = props.fontSize,
	    bgWidth = props.bgWidth,
	    bgHeight = props.bgHeight;
	var mouseXY = moreProps.mouseXY,
	    height = moreProps.height,
	    width = moreProps.width,
	    mouseInsideCanvas = moreProps.show;


	if (show && mouseInsideCanvas) {
		var _mouseXY = _slicedToArray(mouseXY, 2),
		    x = _mouseXY[0],
		    y = _mouseXY[1];

		var cx = x < width / 2 ? x + PADDING : x - bgWidth - PADDING;
		var cy = y < height / 2 ? y + PADDING : y - bgHeight - PADDING;

		var rect = {
			x: cx,
			y: cy,
			width: bgWidth,
			height: bgHeight
		};
		var text = {
			text: props.text,
			x: cx + PADDING / 2,
			y: cy + fontSize
		};

		return {
			rect: rect,
			text: text
		};
	}
}

export default HoverTextNearMouse;
//# sourceMappingURL=HoverTextNearMouse.js.map