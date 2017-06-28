var trade = require('./trade');
var order = require('./order');
var transaction = require('./transaction');
var util = require('./util');

class account {
	constructor(id){
		var self = this;
		api.accounts(id,function(err,data){
			util.bind(self,{
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
			},data);
			if(data.openTrades){
				api.trades({
					account_id : self.id
				}, function(err, trades) {
					self.trades = trades.map(function(data){
						return new trade(data);
					});
				});
			}
			if(data.openOrders){
				api.orders({
					account_id : self.id
				}, function(err, orders) {
					self.orders = orders.map(function(data){
						return new order(data);
					});
				});
			}
		})
		api.events(id, function(err, data) {
			if(err || !data){
				return;
			}
			self._transaction(new transaction(data));
		});
	}
	/*
		MARKET_ORDER_CREATE,
		STOP_ORDER_CREATE,
		LIMIT_ORDER_CREATE,
		MARKET_IF_TOUCHED_ORDER_CREATE,
		ORDER_UPDATE,
		ORDER_CANCEL,
		ORDER_FILLED,
		TRADE_UPDATE,
		TRADE_CLOSE,
		MIGRATE_TRADE_OPEN,
		MIGRATE_TRADE_CLOSE,
		STOP_LOSS_FILLED,
		TAKE_PROFIT_FILLED,
		TRAILING_STOP_FILLED,
		MARGIN_CALL_ENTER,
		MARGIN_CALL_EXIT,
		MARGIN_CLOSEOUT,
		SET_MARGIN_RATE,
		TRANSFER_FUNDS,
		DAILY_INTEREST,
		FEE
	 */
	_transaction(trans){
		console.log(trans);
		switch(trans.type){
		case 'ORDER_UPDATE' :
			break;
		case 'TRADE_UPDATE' :
			break;
		case 'TRADE_CLOSE' :
		case 'STOP_LOSS_FILLED' :
		case 'TAKE_PROFIT_FILLED' :
		case 'TRAILING_STOP_FILLED' :
			this.trades.filter(function(trade){
				return trade.id != trans.trade;
			});
			break;
		case 'ORDER_FILLED' :
		case 'MARKET_ORDER_CREATE' :
			if(trans.tradeOpened.id){

			}
			break;
		case 'ORDER_CANCEL' :
			this.orders.filter(function(order){
				return order.id != trans.order;
			});
			break;
			break;
		}

	}
}
module.exports = account;