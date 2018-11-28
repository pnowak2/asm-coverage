import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CoverageItem, TimeWindow, AxisLabel } from '../model/coverage.model';
import { CoverageService } from '../service/coverage.service';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss']
})
export class CoverageChartComponent implements OnInit {
  @Input() data: Array<CoverageItem> = [];
  @Input() timeWindow: TimeWindow;
  @Output() barClick: EventEmitter<{domEvent: MouseEvent}>;

  axisLabels: Array<AxisLabel> = [];

  constructor(private coverageService: CoverageService) { }

  ngOnInit() {
    this.axisLabels = this.coverageService.createAxisLabels(this.timeWindow);
  }

  onBarClick(evt: MouseEvent) {
    this.barClick.next({
      domEvent: evt
    });
  }
}
