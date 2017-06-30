'use strict'
var util = require('./util');
var _trade = require('./trade');
var _order = require('./order');
class response {
	constructor(data,api,account){
		util.bind(this,{
			time : {
				type :  Date
			},
		},data);
		if(this.tradeReduced){
			if(Object.keys(this.tradeReduced).length == 0){
				delete this.tradeReduced;
			}else{
				this.tradeReduced = new _trade(this.tradeReduced,api,account);
			}
		}
		if(this.tradesClosed){
			if(this.tradesClosed.length == 0){
				delete this.tradesClosed;
			}else{
				this.tradesClosed = this.tradesClosed.map(function(single){
					return new _trade(single,api,account);
				});
			}
		}
		if(this.tradeOpened){
			if(Object.keys(this.tradeOpened).length == 0){
				delete this.tradeOpened;
			}else{
				this.tradeOpened = new _trade(this.tradeOpened,api,account);
			}
		}
		if(this.orderOpened){
			this.orderOpened = new _order(this.orderOpened,api,account);
		}
	}
}
module.exports = response;