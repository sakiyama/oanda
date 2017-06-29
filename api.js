'use strict'
module.exports = function(config,types) {
	config = Object.assign({
		type : 'practice'
	}, config);
	var request = new types.request(config);
	this.accounts = function(id , next){
		if(typeof id == 'function'){
			next = id;
			id = null;
		}
		var url = 'accounts';
		if(id){
			url += `/${id}`;
		}
		request.get({
			url : url
		},function(err,accounts){
			if(accounts){
				if(accounts.accounts){
					accounts = accounts.accounts.map(function(single){
						return new types.account(single);
					});
				}else{
					accounts = new types.account(accounts);
				}
			}
			next(err,accounts);
		});
	}
	this.candles = function(config,next){
		request.get({
			url : 'candles',
			qs : config
		},function(err,data){
			var candles = null;
			if(data.candles){
				candles = data.candles.map(function(single){
					return new types.candle(single);
				})
			}
			next(err,candles);
		});
	}
	this.ticks = function(config,next){
		request.stream({
			url : 'prices',
			qs : config
		},function (err, row) {
			if(row.tick){
				next(null,new types.tick(row.tick));
			}else{
				next(row,null);
			}
		});
	}
	this.events = function(ids,next){
		request.stream({
			url : 'events',
			qs : {
				accountIds : ids
			}
		},function (err, row) {
			if(row.transaction){
				next(null,new types.transaction(row.transaction));
			}else{
				next(row,null);
			}
		});
	}
	this.transactions = function(id,config,next){
		if(arguments.length == 2){
			next = config;
			config = {};
		}
		request.get({
			url :'accounts/'+ id + '/transactions',
			qs : config
		},function (err, row) {
			if(row.transactions){
				var transactions = row.transactions.map(function(single){
					return new types.transaction(single);
				})
				next(null,transactions);
			}else{
				next(row,null);
			}
		});
	};
	["order","trade","position"].forEach(function(name){
		var names = name + "s";
		this[names] = function(id,config,next){
			if(arguments.length == 2){
				next = config;
				config = {};
			}
			accountProperty(false,name,names,id,config,next);
		}
		this[name+'Close'] = function(id,specifer,next){
			closeProperty(name,names,id,specifer,next);
		}
		this[name] = function(id,specifer,next){
			accountProperty(true,name,names,id,specifer,next);
		}
	},this);
	function closeProperty(name,names,id,specifer,next){
		request.delete({
			url :'accounts/'+ id + '/' + names + '/' + specifer
		},function(err,data){
			if(data){
				data = new types[name](data);
			}
			next(err,data);
		});
	}
	this.tradeUpdate = function(id,trade_id,config,next){
		request.patch('accounts/'+ id + '/trades/' + trade_id,config,function(err,data){
			if(data){
				data = new types.trade(data);
			}
			next(err,data);
		});
	}
	this.orderUpdate = function(id,order_id,config,next){
		request.patch('accounts/'+ id + '/orders/' + order_id,config,function(err,data){
			if(data){
				data = new types.order(data);
			}
			next(err,data);
		});
	}
	function accountProperty(single,name,names,id,config,next){
		var url = 'accounts/'+ id + '/' + names;
		if(single){
			url += "/" + config;
		}
		request.get({
			url :url,
			qs : config
		},function(err, row) {
			if(single){
				if(err){
					next(err,null);
				}else{
					next(null,new types[name](row));
				}
			}else{
				if(row[names]){
					var rows = row[names].map(function(single){
						return new types[name](single);
					})
					next(null,rows);
				}else{
					next(row,null);
				}
			}
		});
	}
	/*
	[{
		name:"orders",
		"class":types.order
	},{
		name:"trades",
		"class":types.trade
	},{
		name:"positions",
		"class":types.position
	}].forEach(function(single){
		this[single.name] = function(config,next){
			accountProperty(single,config,next);
		}
		this[single.name+'Close'] = function(config,next){
			closeProperty(single,config,next);
		}
	},this);
	*/
};