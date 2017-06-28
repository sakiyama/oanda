'use strict'
var _api = require('./api.js');
module.exports = function(config) {
	global.api = new _api(config);
	this.types = {
		'account' : require('./account')
	};
};

