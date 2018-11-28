import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CoverageItem, TimeWindow, AxisLabelVM, CoveragePeriodEvent, CoveragePeriod } from '../model/coverage.model';
import { CoverageService } from '../service/coverage.service';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss']
})
export class CoverageChartComponent implements OnInit, OnChanges {
  @Input() timeWindow: TimeWindow;
  @Input() coverageItems: Array<CoverageItem> = [];

  @Output() barClick = new EventEmitter<CoveragePeriodEvent>();

  axisLabels: Array<AxisLabelVM> = [];

  constructor(private coverageService: CoverageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.axisLabels = this.coverageService.createAxisLabels(
      this.timeWindow
    );
  }

  onBarClick(domEvent: MouseEvent, coveragePeriod: CoveragePeriod) {
    this.barClick.next({ domEvent, coveragePeriod });
  }
}
