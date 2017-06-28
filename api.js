'use strict'
var _request = require('./request.js');
module.exports = function(config) {
	config = Object.assign({
		type : 'practice'
	}, config);
	var request = new _request(config);
	this.accounts = function(account_id , next){
		if(typeof account_id == 'function'){
			next = account_id;
			account_id = null;
		}
		var url = 'accounts';
		if(account_id){
			url += `/${account_id}`;
		}
		request.get({
			url : url
		},function(err,accounts){
			if(accounts && accounts.accounts){
				accounts = accounts.accounts;
			}
			next(err,accounts);
		});
	}
	this.candles = function(config,next){
		request.get({
			url : 'candles',
			qs : config
		},next);
	}
	this.ticks = function(config,next){
		request.stream({
			url : 'prices',
			qs : config
		},function (err, row) {
			if(row.tick){
				next(null,row.tick);
			}else{
				next(row,null);
			}
		});
	}
	this.events = function(account_ids,next){
		request.stream({
			url : 'events',
			qs : {
				accountIds : account_ids
			}
		},function (err, row) {
			if(row.transaction){
				next(null,row.transaction);
			}else{
				next(row,null);
			}
		});
	}
	this.transactions = function(config,next){
		var account_id = config.account_id;
		delete config.account_id;
		request.get({
			url :'accounts/'+ account_id + '/transactions',
			qs : config
		},next);
	}
	function accountProperty(name,config,next){
		var account_id = config.account_id;
		delete config.account_id;
		request.get({
			url :'accounts/'+ account_id + '/' + name,
			qs : config
		},function(err, row) {
			if(row[name]){
				next(null,row[name]);
			}else{
				next(row,null);
			}
		});
	}
	function closeProperty(name,config,next){
		request.delete({
			url :'accounts/'+ config.account_id + '/' + name + '/' + config[name+'_id']
		},next);
	}
	["orders","trades","positions"].forEach(function(name){
		this[name] = function(config,next){
			accountProperty(name,config,next);
		}
		this[name+'Close'] = function(config,next){
			closeProperty(name,config,next);
		}
	},this);
};
