import { Component,ElementRef ,Input, Output,EventEmitter, SimpleChanges} from '@angular/core';
import {GoogleChartService} from './goole-chart.service';
import {GoogleChartConstants} from './google-chart-constants';

declare var _this: any;
declare var google: any;

@Component({
  moduleId: module.id,
  selector: 'google-chart',  
  template:`
  	<div>
	<div [style.display]="isLoading?'none':'inherit'" id="{{id}}"  >
	</div>
	<div [style.display]="!isLoading?'none':'inherit'">{{message}}</div>
	</div>`,
  styleUrls: ['angular-google-chart.component.css']
})
export class GoogleChartComponent  {
	@Input() public dataPromise: any;
	@Input() public incrementData: any;
	@Input() public chartType: string;
	@Input() public options: any;
	@Input() public config: any;

	@Output('onSelect') public onSelect : EventEmitter<any> = new EventEmitter();
	@Output('onReady') public onReady : EventEmitter<any> = new EventEmitter();

	@Output('onError') public onError : EventEmitter<any> = new EventEmitter();
	@Output('onInit') public onInit : EventEmitter<any> = new EventEmitter();


	googleChartService : any;
	id : string;

	isLoading : boolean;
	columns : any;
	message : string;

	visualizationPromise : any;
 	chartWrapperPromise : any;
 	googlePromise : any;
 	
 	wrapper : any;

	constructor(googleChartService : GoogleChartService){
		
		this.isLoading  = true;
		this.message = GoogleChartConstants.GOOGLE_CHART_STATE_INIT;
		this.columns = [];
	    this.id = 'google_chart_' + parseInt((Math.random()*1000) + '');
	    this.googleChartService = googleChartService;

	    this.googlePromise = googleChartService.getGoogle();
	    this.visualizationPromise = googleChartService.getVisualization();
	    this.chartWrapperPromise = googleChartService.getChartWrapper();

	}

	ngOnInit() {
		console.log('ngOnInit Called');
		let _this = this;
		_this.message = GoogleChartConstants.GOOGLE_CHART_STATE_LIB;
		_this.chartWrapperPromise.then(function(_chartWrapper){
			_this.wrapper = new _chartWrapper({
                chartType: _this.chartType,
                dataTable: [],
                options: _this.options || {},
                containerId: _this.id
            });

            _this.onInit.emit({
				div : _this.id,
				wrapper : _this.wrapper
			});

            _this.visualizationPromise.then(function(_visualization){
            	if(_this.onReady){
            		google.visualization.events.addListener(_this.wrapper, 'ready', function(){
            			_this.onReady.emit({});
            			_this.isLoading  = false;
            		});
            	}

            	if(_this.onError){
            		google.visualization.events.addListener(_this.wrapper, 'error', function(id,message){
    					_this.onError.emit({id : id, message : message});
    				});
            	}

        	

        	if(_this.onSelect){
        		_visualization.events.addListener(_this.wrapper, 'select', function () {
					const selectedItem = _this.wrapper.getChart().getSelection()[0];
	                if (selectedItem) {
	                    let msg;
	                    if (selectedItem !== undefined) {
	                        const selectedRowValues = [];
	                        if (selectedItem.row !== null) {
	                            selectedRowValues.push(_this.wrapper.getDataTable().getValue(selectedItem.row, 0));
	                            selectedRowValues.push(_this.wrapper.getDataTable().getValue(selectedItem.row, selectedItem.column));
	                            msg = {
	                                message: 'select',
	                                row: selectedItem.row,
	                                column: selectedItem.column,
	                                selectedRowValues: selectedRowValues,
	                                wrapper : _this.wrapper
	                            };
	                        }
	                    }
	                    _this.onSelect.emit(msg);
	                } else
	                    _this.onSelect.emit(undefined);
					});
        	}});	
        	_this.drawChart(_this.dataPromise);
		});
	
	
	}

	drawChart(_dataPromise){
		let _this = this;
		_this.message = GoogleChartConstants.GOOGLE_CHART_STATE_DATA;
		_this.isLoading = true;
		_dataPromise.then(function(_data){
			_this.message = GoogleChartConstants.GOOGLE_CHART_STATE_RENDER;
			if(_this.config && _this.config.firstRowAsData){
				_this.wrapper.setDataTable(google.visualization.arrayToDataTable(_data,true));
			}else{
				_this.wrapper.setDataTable(google.visualization.arrayToDataTable(_data));
			}
			
			_this.wrapper.draw();
			
		});
		
	}
    
	ngOnChanges(changes : SimpleChanges){
		let self = this;
		if(changes.dataPromise && !changes.dataPromise.firstChange && 
		   changes.options && !changes.options.firstChange){
			let newOptions = changes.options.currentValue;
			this.wrapper.setOptions(newOptions);
			self.drawChart(changes.dataPromise.currentValue);
		}else if(changes.dataPromise && !changes.dataPromise.firstChange){
			self.drawChart(changes.dataPromise.currentValue);
		}else if(changes.options && !changes.options.firstChange){
			let newOptions = changes.options.currentValue;
			this.wrapper.setOptions(newOptions);
			this.wrapper.draw();
		}
	}

	addError(errorDtls){
		let _this  =  this;
		_this.visualizationPromise.then(function(_visualization){
			google.visualization.events.trigger(_this.wrapper, 'error',errorDtls);
		});
	}
}
