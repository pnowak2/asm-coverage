import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CoverageItem, TimeWindow, AxisLabelVM, CoveragePeriodEvent, CoverageItemVM, CoveragePeriodVM } from '../model/coverage.model';
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

  _axisLabels: Array<AxisLabelVM> = [];
  _coverageItems: Array<CoverageItemVM> = [];

  constructor(private coverageService: CoverageService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const vm = this.coverageService.createCoverageVM(this.timeWindow, this.coverageItems);

    this._axisLabels = vm.axisLabels;
    this._coverageItems = vm.coverageItems;
  }

  onBarClick(domEvent: MouseEvent, coveragePeriod: CoveragePeriodVM) {
    this.barClick.next({ domEvent });
  }
}
