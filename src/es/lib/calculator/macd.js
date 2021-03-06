"use strict";

/*
https://github.com/ScottLogic/d3fc/blob/master/src/indicator/algorithm/calculator/macd.js

The MIT License (MIT)

Copyright (c) 2014-2015 Scott Logic Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import ema from "./ema";

import { isDefined, zipper } from "../utils";
import { MACD as defaultOptions } from "./defaultOptionsForComputation";

export default function () {
	var options = defaultOptions;

	function calculator(data) {
		var _options = options,
		    fast = _options.fast,
		    slow = _options.slow,
		    signal = _options.signal,
		    sourcePath = _options.sourcePath;


		var fastEMA = ema().options({ windowSize: fast, sourcePath: sourcePath });

		var slowEMA = ema().options({ windowSize: slow, sourcePath: sourcePath });

		var signalEMA = ema().options({ windowSize: signal, sourcePath: undefined });

		var macdCalculator = zipper().combine(function (fastEMA, slowEMA) {
			return isDefined(fastEMA) && isDefined(slowEMA) ? fastEMA - slowEMA : undefined;
		});

		var macdArray = macdCalculator(fastEMA(data), slowEMA(data));

		var undefinedArray = new Array(slow);
		var signalArray = undefinedArray.concat(signalEMA(macdArray.slice(slow)));

		var zip = zipper().combine(function (macd, signal) {
			return {
				macd: macd,
				signal: signal,
				divergence: isDefined(macd) && isDefined(signal) ? macd - signal : undefined
			};
		});

		var macd = zip(macdArray, signalArray);

		return macd;
	}

	calculator.undefinedLength = function () {
		var _options2 = options,
		    slow = _options2.slow,
		    signal = _options2.signal;

		return slow + signal - 1;
	};
	calculator.options = function (x) {
		if (!arguments.length) {
			return options;
		}
		options = _extends({}, defaultOptions, x);
		return calculator;
	};

	return calculator;
}
//# sourceMappingURL=macd.js.map