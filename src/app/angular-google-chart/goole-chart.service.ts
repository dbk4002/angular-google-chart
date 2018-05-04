import { Injectable } from '@angular/core';
import {CommonService} from './common.service';
import {GoogleChartConstants} from './google-chart-constants';

declare var google: any;

@Injectable()
export class GoogleChartService {
 	googleServicePromise : any;
 	googlePromise : any;
 	visualizePromise : any;
 	wrapperPromise : any;



	constructor(private commonService : CommonService){

	let _this = this;
	let loaderPromise = commonService.loadFile(GoogleChartConstants.GOOGLE_CHART_LOADER_URL);
	_this.googleServicePromise = new Promise(function(resolve, reject){
			_this.googlePromise = commonService.isLoaded('google',undefined);
			_this.googlePromise.then(function(){
				console.log('GoogleService : constructor :: Google Loaded');
			});
			_this.visualizePromise = commonService.isLoaded('google.visualization',undefined);
			_this.wrapperPromise = commonService.isLoaded('google.visualization.ChartWrapper',undefined);
			resolve({
				google : _this.googlePromise,
				visualization : _this.visualizePromise,
				chartWrapper : _this.wrapperPromise
			});
		});
	loaderPromise.then(function(){
		google.charts.load('current', {
		  callback: function () {
		     console.log('GoogleService : constructor :: Packages Loaded');
		  },
		  packages: ['corechart','line']
		});


	});
	
	
	}

    getGoogle(){
    	return this.googlePromise;
    }

    getVisualization(){
    	return this.visualizePromise;
    }

    getChartWrapper(){
    	return this.wrapperPromise;
    }
    loadGoogleChartLibrary(){

    }
	loadLibrary(){
		return this.googleServicePromise;
	}
}