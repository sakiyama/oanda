'use strict'
var request = require('request');
module.exports = function(config) {
	switch(config.type){
	case 'sandbox' :
		this.host = {
			rest : 'http://api-sandbox.oanda.com',
			stream : 'http://stream-sandbox.oanda.com'
		};
		break;
	case 'practice' :
		this.host = {
			rest : 'https://api-fxpractice.oanda.com',
			stream : 'https://stream-fxpractice.oanda.com'
		};
		break;
	case 'real':
		this.host = {
			rest : 'https://api-fxtrade.oanda.com',
			stream : 'https://stream-fxtrade.oanda.com'
		};
		break;
	}
	this.host["labs"] = this.host.rest + '/labs'
	for(var property in this.host){
		this.host[property] = this.host[property] + '/v1/';
	}
	request = request.defaults({
		headers: {
			Authorization : 'Bearer ' + config.key,
			"X-Accept-Datetime-Format" : 'UNIX'
		}
	});
	this.stream = function(config,next){
		var streambuffer = "";
		config.url = this.host.stream + config.url;
		request.get(config ,function (err, res, body) {
		}).on('data', function(data) {
			data = data.toString() + streambuffer;
			streambuffer == "";
			data.split('\r\n').forEach(function(row){
				if(!row){
					return;
				}
				try{
					row = JSON.parse(row);
				}catch(e){
					streambuffer = row;
				}
				if(row.heartbeat){
					return;
				}
				next(null,row);
			})
		});
	};
	function afterRequest(err, res, body, next){
		if(err){
			return next(err,null);
		}
		if(body){
			body = JSON.parse(body)
		}
		if(res.statusCode >= 200 && res.statusCode <= 226){
			next(null,body);
		}else{
			next(body,null);
		}
	}
	["get","delete"].forEach(function(method){
		this[method] = function(config,next){
			config.url = this.host.rest + config.url;
			request[method](config ,function (err, res, body) {
				afterRequest(err, res, body, next);
			});
		};
	},this);
	["patch","post"].forEach(function(method){
		this[method] = function(url,config,next){
			url = this.host.rest + url;
			request[method](url,{form:config} ,function (err, res, body) {
				afterRequest(err, res, body, next);
			});
		};
	},this);
	this.labs = function(config,next){
		config.url = this.host.labs + config.url;
		request.get(config ,function (err, res, body) {
			afterRequest(err, res, body, next);
		});
	}
};
