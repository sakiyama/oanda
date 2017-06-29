# oanda

*This is a work in progress that I'm making in my spare time. I cant't guarantee that any of it is fast, stable, or even working. There is no OAuth implementation, so you must already have an access token in order to use the API*

This library is a NodeJS wrapper for the [Oanda REST API](http://developer.oanda.com/rest-live/introduction/). It provides a simple abstraction layer for making requests and retrieving responses from the API.

This library targets v1 api. v3 is not supported in japan OMG.

####Example request
	var oanda = require('./oanda/')({
		key: '99999999999999999999999999999999-99999999999999999999999999999999'
		type: 'practice' // 'real' or 'sandbox'
	});

	var api = oanda.api;
	var usd_jpy = "USD_JPY";
	api.accounts(function(err,accounts){
		var account_id = accounts[0].id;
		api.candles({
			instrument : usd_jpy,
			count : 1,
			accountId : account_id
		},function(err,candles){
	//		console.log(err, candles);
		});
		api.ticks({
			instruments : usd_jpy,
			accountId : account_id
		},function(err,tick){
	//		console.log(err,tick);
		});
		api.accounts(account_id,function(err,account){
	//		console.log(err,account);
		});
		api.candles({
			instrument : usd_jpy,
			count : 1,
			accountId : account_id
		},function(err,candles){
	//		console.log(err,candles);
		});
		api.ticks({
			instruments : usd_jpy,
			accountId : account_id
		},function(err,tick){
	//		console.log(err,tick);
		});
		api.events(account_id, function(err, transaction) {
	//		console.log(err,transaction);
		});
		api.transactions(account_id, function(err, transactions) {
	//		console.log(err, transactions);
		});

		api.orders(account_id, function(err, orders) {
			if(orders && orders[0]){
				api.order(account_id,orders[0].id,function(err, order) {
	//				console.log(err, order);
				});
				api.orderUpdate(account_id,orders[0].id,{
					units : 1
				},function(err, order) {
					console.log(err, order);
				});
			}
	//		console.log(err, orders);
		});
		api.orders(account_id,{
			instrument : usd_jpy
		}, function(err, orders) {
	//		console.log(err, orders);
		});
		api.trades(account_id, function(err, trades) {
			if(trades && trades[0]){
				api.trade(account_id,trades[0].id, function(err, trade) {
	//				console.log(err, trade);
				});
				api.tradeUpdate(account_id,trades[0].id,{
					stopLoss : 109
				}, function(err, trade) {
	//				console.log(err, trade);
				});
			}
	//		console.log(err, trades);
		});
		api.positions(account_id, function(err, positions) {
	//		console.log(err, positions);
		});
		api.position(account_id,usd_jpy, function(err, position) {
	//		console.log(err, position);
		});
	/*
		api.positionClose(account_id,usd_jpy, function(err, position) {
			console.log(err, position);
		});
		api.orderClose(account_id,10556566016, function(err, order) {
			console.log(err, order);
		});
		api.tradeClose(account_id,10560156016, function(err, trade) {
			console.log(err, trade);
		});
	*/
	});