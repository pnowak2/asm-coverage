import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CoverageItem, DateRange, CoveragePeriodEvent, CoverageVM } from '../model/coverage.model';
import { CoverageService } from '../service/coverage.service';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss']
})
export class CoverageChartComponent implements  OnChanges {
  @Input() timeWindow: DateRange;
  @Input() coverageItems: Array<CoverageItem> = [];

  @Output() barClick = new EventEmitter<CoveragePeriodEvent>();

  vm: CoverageVM;

  constructor(private coverageService: CoverageService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.vm = this.coverageService.createCoverageVM(
      this.timeWindow, this.coverageItems
    );
  }

  onBarClick(domEvent: MouseEvent) {
    this.barClick.next({ domEvent });
  }
}
