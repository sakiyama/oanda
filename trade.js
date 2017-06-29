var util = require('./util');
class trade {
	constructor(data,api,id){
		this.account = id;
		var trade = this;
		data = util.removeSide(data);
		util.bind(this,{
			side : {
				remove :  true
			},
			time : {
				type :  Date
			}
		},data);
		this.close = function(next){
			return api.tradeClose(this.account,this.id,next);
		}
		this.update = function(config,next){
			return api.tradeUpdate(trade.account,trade.id,config,next);
		}
		this.update = function(config,next){
			return api.tradeUpdate(trade.account,trade.id,config,next);
		}
		this.get = function(next){
			return api.trade(trade.account,trade.id,next);
		}
	}
}
module.exports = trade;