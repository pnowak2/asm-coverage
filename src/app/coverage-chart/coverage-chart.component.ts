import { Component, Input } from '@angular/core';
import { CoverageItem, TimeWindow } from './model/coverage.model';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss']
})
export class CoverageChartComponent {
  @Input() data: Array<CoverageItem> = [];
  @Input() timeWindow: TimeWindow;
}
