'use strict'
module.exports = {
	bind : function(target,config,data){
		for ( var property in data) {
			if (typeof config[property] === 'undefined') {
				target[property] = data[property];
				continue;
			}
			var s_config = config[property];
			if(s_config.remove){
				continue;
			}
			var name = property;
			if(s_config.name){
				name = s_config.name;
			}
			if(!s_config.type){
				target[name] = data[property];
				continue;
			}
			var result;
			if (s_config.type == Date){
				result = new Date(data[property]/1000);
			}else{
				result = method(data[property]);
			}
			if(typeof result === 'undefined'){
				continue;
			}
			target[name] = result;
		}
	},
	removeSide : function(data){
		if(data.side == 'sell' && data.units){
			data.units *= -1;
		}
		if(data.side){
			delete data.side;
		}
		return data;
	}
};