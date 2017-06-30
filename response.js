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
		/*
		if(this.tradeReduced){
			console.log("this.tradeReduced",this.tradeReduced);
			this.tradeReduced = new _trade(this.tradeReduced,api,account);
		}*/
		if(this.tradeOpened){
			this.tradeOpened = new _trade(this.tradeOpened,api,account);
		}
		if(this.orderOpened){
			this.orderOpened = new _order(this.orderOpened,api,account);
		}
	}
}
module.exports = response;