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
		types : types,
		timespan : {
			s5 : 5000,
			s10 : 10000,
			s15 : 15000,
			s30 : 30000,
			m1 : 60000,
			m2 : 120000,
			m4 : 240000,
			m5 : 300000,
			m10 : 600000,
			m15 : 900000,
			m30 : 1800000,
			h1 : 3600000,
			h2 : 7200000,
			h3 : 10800000,
			h4 : 14400000,
			h6 : 2160000,
			h8 : 28800000,
			h12 : 43200000,
			d : 86400000,
			w : 604800000,
			m : 2419200000,
		}
	}
};