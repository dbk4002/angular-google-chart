import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'app';
dataPromise : any;
options : any;
onSelect : any;

constructor(){
	this.dataPromise = new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve([
				  ["Year", "Sales", "Expenses"],
				  ["2003",  1000,      400],
				  ["2005",  1170,      460],
				  ["2006",  660,       1120],
				  ["2007",  1030,      540]
				]);
			},3000);
		});
	this.options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' },
          height : 700,
          width : 700,
          pointsVisible : true,
           animation:{
	        duration: 1000,
	        easing: 'out',
	      }
        };
        this.onSelect = function(selectedValues){
        	console.log(selectedValues);
        	this.selectedValues = JSON.stringify(selectedValues);
        }
        let self = this;
        setTimeout(function(){
        	let newOptions = Object.assign({},self.options);
        	newOptions.width = 900;

        	self.options = newOptions;

        },10000);
}


  
}
