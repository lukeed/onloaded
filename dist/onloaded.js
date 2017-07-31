'use strict';

var forEach = function (arr, fn) {
	var i=0, len=arr.length;

	for (; i < len; i++) {
		fn(arr[i], i, arr);
	}
};

function noop() {}

var index = function (elem, opts) {
	opts = opts || {};

	if (typeof elem == 'string') {
		elem = document.querySelectorAll(elem);
	} else if (elem.length == void 0) {
		if (elem.nodeName == 'IMG') {
			elem = [elem]; // was single img
		} else {
			elem = elem.getElementsByTagName('img');
		}
	}

	var ok = 0;
	var err = 0;
	var total = elem.length;

	function isDone() {
		var perc = (ok + err) / total;
		var func = perc === 1 ? opts.onComplete : opts.onProgress;
		(func || noop)(perc, { failed:err, loaded:ok, total: total });
	}

	function onload() {
		ok++; (opts.onLoad || noop)(this); isDone();
	}

	function onerror() {
		err++; (opts.onError || noop)(this); isDone();
	}

	forEach(elem, function (el) {
		el.onload = onload;
		el.onerror = onerror;
	});
};

module.exports = index;
