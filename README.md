# oanda

*This is a work in progress that I'm making in my spare time. I cant't guarantee that any of it is fast, stable, or even working. There is no OAuth implementation, so you must already have an access token in order to use the API*

This library is a NodeJS wrapper for the [Oanda REST API](http://developer.oanda.com/rest-live/introduction/). It provides a simple abstraction layer for making requests and retrieving responses from the API.

This library targets v1 api. v3 is not supported in japan OMG.

####Example request

	var oanda = require('./oanda/')({
		key: '99999999999999999999999999999999-99999999999999999999999999999999'
		type: 'practice' // 'real' or 'sandbox'
	});

	oanda.api.accounts(function(err,accounts){
		var account = accounts[0];

		account.candles({
			instrument : "USD_JPY",
			count : 1,
		},function(err,candles){
			console.log(err, candles);
		});
		account.ticks({
			instruments : "USD_JPY",
		},function(err,tick){
			// streaming
			console.log(err,tick);
		});

		account.transactions(function(err, transactions) {
			console.log(err, transactions);
		});

		account.events(function(err, transaction) {
			// streaming
			 console.log(err,transaction);
		});

		account.order.market({
			instrument : 'USD_JPY',
			units:-1
		},function(err,res){
			 console.log(err,res);
		});

		account.order.limit({
			instrument : 'USD_JPY',
			units:1,
			price : 110,
			expiry : Date.now() + 3600000
		},function(err,res){
			 console.log(err,res);
		});

		account.orders(function(err, orders) {
			if(!orders || !orders[0]){
				return;
			}
			orders[0].update({
				units : 1
			});
		});

		account.orders({
			instrument : "USD_JPY"
		}, function(err, orders) {
			console.log(err, orders);
		});

		account.trades(function(err, trades) {
			if(!trades || !trades[0]){
				return;
			}
			trades[0].update({
				stopLoss : 109
			});
		});

		account.positions(function(err, positions) {
			console.log(err, positions);
		});

		account.position("USD_JPY", function(err, position) {
			console.log(err, position);
		});
	});