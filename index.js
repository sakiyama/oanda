'use strict'
var api = require('./api.js');
module.exports = function(config) {
	var types = {};
	[
		'account',
		'request',
		'candle',
		'tick',
		'account',
		'transaction',
		'order',
		'trade',
		'position',
		'response',
	].forEach(function(name){
		types[name] = require('./'+name);
	})
	return {
		api : new api(config,types),
		types : types
	}
};