import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CoverageChartComponent } from './coverage-chart/coverage-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    CoverageChartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
