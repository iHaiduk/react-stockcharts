"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

import { noop } from "../utils";
import GenericChartComponent from "../GenericChartComponent";
import { getMouseCanvas } from "../GenericComponent";

var ClickCallback = function (_Component) {
	_inherits(ClickCallback, _Component);

	function ClickCallback() {
		_classCallCheck(this, ClickCallback);

		return _possibleConstructorReturn(this, (ClickCallback.__proto__ || Object.getPrototypeOf(ClickCallback)).apply(this, arguments));
	}

	_createClass(ClickCallback, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    onMouseDown = _props.onMouseDown,
			    onClick = _props.onClick,
			    onDoubleClick = _props.onDoubleClick,
			    onContextMenu = _props.onContextMenu,
			    onMouseMove = _props.onMouseMove,
			    onPan = _props.onPan,
			    onPanEnd = _props.onPanEnd;


			return _jsx(GenericChartComponent, {
				onMouseDown: onMouseDown,
				onClick: onClick,
				onDoubleClick: onDoubleClick,
				onContextMenu: onContextMenu,
				onMouseMove: onMouseMove,
				onPan: onPan,
				onPanEnd: onPanEnd,
				svgDraw: noop,
				canvasDraw: noop,
				canvasToDraw: getMouseCanvas,
				drawOn: ["mousemove", "pan"]
			});
		}
	}]);

	return ClickCallback;
}(Component);

ClickCallback.defaultProps = {
	disablePan: false
};

export default ClickCallback;
//# sourceMappingURL=ClickCallback.js.map