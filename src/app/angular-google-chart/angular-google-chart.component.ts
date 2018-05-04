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
		let self = this;
		self.drawChart(self.dataPromise);
	}

	drawChart(_dataPromise){
		let _this = this;
		_this.message = GoogleChartConstants.GOOGLE_CHART_STATE_LIB;
		_this.chartWrapperPromise.then(function(_chartWrapper){
			_this.message = GoogleChartConstants.GOOGLE_CHART_STATE_DATA;
			_dataPromise.then(function(_data){
				_this.message = GoogleChartConstants.GOOGLE_CHART_STATE_RENDER;
				_this.wrapper = new _chartWrapper({
	                chartType: _this.chartType,
	                dataTable: _data,
	                options: _this.options || {},
	                containerId: _this.id
	            });
	            _this.wrapper.draw();
	            _this.isLoading  = false;


	            _this.visualizationPromise.then(function(_visualization){
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
		                                selectedRowValues: selectedRowValues
		                            };
		                        }
		                    }
		                    _this.onSelect.emit(msg);
		                } else
		                    _this.onSelect.emit(undefined);
					});
				});
	            
			});
			
		});
	}
    
	ngOnChanges(changes : SimpleChanges){
		let self = this;
		if(changes.dataPromise && !changes.dataPromise.firstChange){
			self.drawChart(changes.dataPromise.currentValue);
		}else if(changes.options && !changes.options.firstChange){
			let newOptions = changes.options.currentValue;
			this.wrapper.setOptions(newOptions);
			this.wrapper.draw();
		}
	}
}
