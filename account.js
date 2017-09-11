'use strict'
var util = require('./util');
class account {
	constructor(data,api){
		util.bind(this,{
			accountId : {
				name : 'id'
			},
			accountName : {
				name : 'name'
			},
			openTrades : {
				remove : true
			},
			openOrders : {
				remove :  true
			},
			accountCurrency : {
				name :  'currency'
			},
		},data);
		var id = this.id;
		this.get = function(next){
			return api.accounts(id,next);
		}
		this.instruments = function(next){
			return api.instruments(id,next);
		}
		this.candles = function(config,next){
			config.accountId = id;
			return api.candles(config,next);
		}
		this.ticks = function(config,next){
			config.accountId = id;
			return api.ticks(config,next);
		}
		this.events = function(next){
			return api.events(id,next);
		}
		this.transactions = function(config,next){
			if(arguments.length == 1){
				next = config;
				config = {};
			}
			return api.transactions(id,config,next);
		};
		["order","trade","position"].forEach(function(name){
			var names = name + "s";
			this[names] = function(config,next){
				if(arguments.length == 1){
					next = config;
					config = {};
				}
				return api[names](id,config,next);
			}
		},this);
		this.position = function(specifer,next){
			return api.position(id,specifer,next);
		}
		this.order = {};
		['limit',
		'stop',
		'marketIfTouched' ,
		'market'].forEach(function(name){
			this.order[name] = function(config,next){
				config.type = name;
				return api.orderCreate(id,config,next);
			};
		},this);
	}
}
module.exports = account;