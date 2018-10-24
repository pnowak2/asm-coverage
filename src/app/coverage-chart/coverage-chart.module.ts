import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoverageChartComponent } from './component/coverage-chart.component';
import { CoverageService } from './service/coverage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CoverageChartComponent
  ],
  declarations: [
    CoverageChartComponent
  ],
  providers: [
    CoverageService
  ]
})
export class CoverageChartModule { }
