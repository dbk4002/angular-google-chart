import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {GoogleChartModule} from './angular-google-chart/google-chart.module';
import { LlineChartDemoComponent } from './lline-chart-demo/lline-chart-demo.component';
import { DemoComponent } from './demo/demo.component';



@NgModule({
  declarations: [
    AppComponent,
    LlineChartDemoComponent,
    DemoComponent
    
  ],
  imports: [
    BrowserModule,GoogleChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
