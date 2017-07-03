'use strict'
var util = require('./util');
class position {
	constructor(data,api,id){
		this.account = id;
		data = util.removeSide(data);
		util.bind(this,{
		},data);
		this.close = function(next){
			return api.positionClose(this.account,this.instrument,next);
		}
	}
}
module.exports = position;