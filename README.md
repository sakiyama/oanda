# oanda

*This is a work in progress that I'm making in my spare time. I cant't guarantee that any of it is fast, stable, or even working. There is no OAuth implementation, so you must already have an access token in order to use the API*

This library is a NodeJS wrapper for the [Oanda REST API](http://developer.oanda.com/rest-live/introduction/). It provides a simple abstraction layer for making requests and retrieving responses from the API.

This library targets v1 api. v3 is not supported in japan OMG.

####Example request

	var api = new oanda({
		key: key,//99999999999999999999999999999999-99999999999999999999999999999999
		type: 'practice'
	});
	api.accounts(function(err,accounts){
		console.log(accounts);
		var account_id = accounts.accounts[0].accountId;
		api.accounts(account_id,function(err,account){
	//		console.log(err,account);
		});
		api.candles({
			instrument : "USD_JPY",
			count : 1,
			accountId : account_id
		},function(err,candles){
	//		console.log(err,candles);
		});
		api.ticks({
			instruments : "USD_JPY",
			accountId : account_id
		},function(err,tick){
	//		console.log(err,tick);
		});
		api.events(account_id, function(err, transaction) {
	//		console.log(err,transaction);
		});
		api.transactions({
			account_id : account_id
		}, function(err, transactions) {
	//		console.log(err, transactions);
		});

		api.orders({
			account_id : account_id
		}, function(err, orders) {
	//		console.log(err, orders);
		});
		api.trades({
			account_id : account_id
		}, function(err, trades) {
			if(!trades.length){
				return;
			}
			api.tradesClose({
				account_id : account_id,
				trades_id : trades[0].id,
			}, function(err, trades) {
				console.log(err, trades);
			});
		});
		api.positions({
			account_id : account_id
		}, function(err, positions) {
	//		console.log(err, positions);
		});
	});

