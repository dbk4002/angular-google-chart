import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonService } from './common.service';
import { GoogleChartService } from './goole-chart.service';

import { GoogleChartComponent } from './angular-google-chart.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GoogleChartComponent
  ],
  providers: [CommonService, GoogleChartService],
  exports: [GoogleChartComponent]
})
export class GoogleChartModule {}