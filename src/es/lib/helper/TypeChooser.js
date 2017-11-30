"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import PropTypes from "prop-types";

var _ref = _jsx("label", {}, void 0, "Type: ");

var _ref2 = _jsx("option", {
	value: "svg"
}, void 0, "svg");

var _ref3 = _jsx("option", {
	value: "hybrid"
}, void 0, "canvas + svg");

var TypeChooser = function (_Component) {
	_inherits(TypeChooser, _Component);

	function TypeChooser(props) {
		_classCallCheck(this, TypeChooser);

		var _this = _possibleConstructorReturn(this, (TypeChooser.__proto__ || Object.getPrototypeOf(TypeChooser)).call(this, props));

		_this.state = {
			type: _this.props.type
		};
		_this.handleTypeChange = _this.handleTypeChange.bind(_this);
		return _this;
	}

	_createClass(TypeChooser, [{
		key: "handleTypeChange",
		value: function handleTypeChange(e) {
			// console.log(e.target.value);
			this.setState({
				type: e.target.value
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _jsx("div", {}, void 0, _ref, _jsx("select", {
				name: "type",
				id: "type",
				onChange: this.handleTypeChange,
				value: this.state.type
			}, void 0, _ref2, _ref3), _jsx("div", {
				style: this.props.style
			}, void 0, this.props.children(this.state.type)));
		}
	}]);

	return TypeChooser;
}(Component);

TypeChooser.defaultProps = {
	type: "hybrid",
	style: {}
};

export default TypeChooser;
//# sourceMappingURL=TypeChooser.js.map