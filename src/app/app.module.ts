import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoverageChartModule } from './coverage-chart/coverage-chart.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoverageChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
