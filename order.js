'use strict'
var util = require('./util');
class order {
	constructor(data,api,account){
		this.account = account;
		var order = this;
		data = util.removeSide(data);
		util.bind(this,{
			side : {
				remove :  true
			},
			time : {
				type :  Date
			},
			expiry : {
				type :  Date
			},
		},data);
		this.get = function(next){
			return api.order(order.account,order.id,next);
		}
		this.close = function(next){
			return api.orderClose(order.account,order.id,next);
		}
		this.update = function(config,next){
			return api.orderUpdate(order.account,order.id,config,next);
		}
	}
}
module.exports = order;