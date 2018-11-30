import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CoverageItem, DateRange, CoveragePeriodEvent, CoverageVM, CoveragePeriod } from '../model/coverage.model';
import { CoverageService } from '../service/coverage.service';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss']
})
export class CoverageChartComponent implements OnChanges {
  @Input() resolution: 'day' | 'week' | 'month' | 'quarter' | 'year' = 'month';
  @Input() timeWindow: DateRange;
  @Input() coverageItems: Array<CoverageItem> = [];

  @Output() barClick = new EventEmitter<CoveragePeriodEvent>();
  @Output() barMouseover = new EventEmitter<CoveragePeriodEvent>();
  @Output() barMouseout = new EventEmitter<CoveragePeriodEvent>();

  vm: CoverageVM;

  constructor(private coverageService: CoverageService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.vm = this.coverageService.createCoverageVM(
      this.coverageItems,
      this.timeWindow,
      this.resolution
    );
  }

  onBarClick(domEvent: MouseEvent, period: CoveragePeriod) {
    this.barClick.next({ domEvent, period });
  }

  onBarMouseover(domEvent: MouseEvent, period: CoveragePeriod) {
    this.barMouseover.next({ domEvent, period });
  }

  onBarMouseout(domEvent: MouseEvent, period: CoveragePeriod) {
    this.barMouseout.next({ domEvent, period });
  }
}
