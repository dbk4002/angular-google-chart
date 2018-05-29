import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lline-chart-demo',
  templateUrl: './lline-chart-demo.component.html',
  styleUrls: ['./lline-chart-demo.component.css']
})
export class LlineChartDemoComponent implements OnInit {
  dataPromise : any;
  options : any;
  onSelect : any;
  onReady : any;
  onInit : any;
  onError : any;
  wrapper : any;


  constructor() {
  	  let _this = this; 
  	  let _data = [
					  ["Year", "Sales", "Expenses"],
					  ["2003",  1000,      400],
					  ["2005",  1170,      460],
					  ["2006",  660,       1120],
					  ["2007",  1030,      540]
					];
		let _data2 = [
					  ["Year", "Sales", "Expenses"],
					  ["2003",  1100,      400],
					  ["2005",  1270,      460],
					  ["2006",  670,       1120],
					  ["2007",  1530,      540]
					];

		this.dataPromise = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve(_data);
			},3000);
		});

		setTimeout(function(){
			_this.dataPromise = new Promise(function(resolve,reject){
				setTimeout(function(){
					resolve(_data2);
				},3000);
			});
		},6000);

		this.options = {
				title: 'Company Performance',
				curveType: 'function',
				legend: { position: 'bottom2' },
				height : 400,
				width : 500,
				pointsVisible : true,
				animation:{
				duration: 1000,
				easing: 'out2'
			}
		};

		this.onSelect = function(selectedValues){
			console.log(selectedValues);
			this.selectedValues = JSON.stringify(selectedValues);
		}

		this.onInit = function(initData){
			_this.wrapper = initData.wrapper;
			console.log('initData:',initData);
		}

		this.onReady = function(readyResponse){
			console.log('readyResponse:',readyResponse);
		}
		this.onError = function(errorObj){
			console.log('errorObj:',errorObj);
		}

		
	    

	    let self = this;
        setTimeout(function(){
        	let newOptions = Object.assign({},self.options);
        	newOptions.width = 750;
        	newOptions.height = 600;

        	self.options = newOptions;

        },10000);
    }

  ngOnInit() {
  }
  getSelection(){
		if(this.wrapper && this.wrapper.getChart() && this.wrapper.getChart().getSelection()){
			console.log(this.wrapper.getChart().getSelection()[0]);
		}
	
	}

}
