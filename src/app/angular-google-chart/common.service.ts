import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
	constructor(){
	}

	isLoaded(component,interval){
		let _this = this;
		if(!interval){
			//Defualt Check = 1 second
			interval = 1000;
		}
		return new Promise(function(resolve,reject){
			let _val = _this.checkLoad(component);
			
			if(_val){
				resolve(_val);
			}else{
				let checkIntervalId = setInterval(function(){
					_val = _this.checkLoad(component);
					if(_val){
						clearInterval(checkIntervalId);
						resolve(_val);
					}
				},interval);
			}
		});
	}

	checkLoad(component){
		let _val;
		try{
			_val = eval(component);
			return _val;
		}catch(e){
			//If Not Defined
		}
		return undefined;
	}

	loadFile(filePath){
		return new Promise(function(resolve,reject){
			var head = document.getElementsByTagName('head')[0];
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = filePath;

			// then bind the event to the callback function 
			// there are several events for cross browser compatibility
			function onComplete(){
				resolve();
			}
			//script.onreadystatechange = onComplete;
			script.onload = onComplete;

			// fire the loading
			head.appendChild(script);
		});
				
	}
}