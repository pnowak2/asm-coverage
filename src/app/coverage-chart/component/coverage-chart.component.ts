import { Component, Input } from '@angular/core';
import { CoverageItem, TimeWindow, AxisLabel } from '../model/coverage.model';
import { CoverageService } from '../service/coverage.service';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss']
})
export class CoverageChartComponent {
  @Input() data: Array<CoverageItem> = [];
  @Input() timeWindow: TimeWindow;

  axisLabels: Array<AxisLabel> = [];

  constructor(private coverageService: CoverageService) {
    this.axisLabels = coverageService.createAxisLabels(this.timeWindow);
  }
}
