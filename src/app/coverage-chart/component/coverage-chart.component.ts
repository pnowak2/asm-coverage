import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CoverageItem, CoveragePeriod, CoverageEvent, CoverageVM, DateRange} from '../model/coverage.model';
import {CoverageService} from '../service/coverage.service';

@Component({
  selector: 'asm-coverage-chart',
  templateUrl: './coverage-chart.component.html',
  styleUrls: ['./coverage-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoverageChartComponent implements OnChanges {
  @Input() resolution: 'day' | 'week' | 'month' | 'quarter' | 'year' = 'month';
  @Input() timeWindow: DateRange;
  @Input() markerDate: Date;
  @Input() coverageItems: Array<CoverageItem> = [];

  @Output() barClick = new EventEmitter<CoverageEvent>();
  @Output() barMouseover = new EventEmitter<CoverageEvent>();
  @Output() barMouseout = new EventEmitter<CoverageEvent>();

  vm: CoverageVM;

  constructor(private coverageService: CoverageService) { }

  ngOnChanges(changes: SimpleChanges) {
    this.vm = this.coverageService.createCoverageVM(
      this.coverageItems,
      this.timeWindow,
      this.markerDate,
      this.resolution
    );
  }

  onBarClick(domEvent: MouseEvent, item: CoverageItem, period: CoveragePeriod) {
    this.barClick.next({ domEvent, item, period });
  }

  onBarMouseover(domEvent: MouseEvent, item: CoverageItem, period: CoveragePeriod) {
    this.barMouseover.next({ domEvent, item, period });
  }

  onBarMouseout(domEvent: MouseEvent, item: CoverageItem, period: CoveragePeriod) {
    this.barMouseout.next({ domEvent, item, period });
  }
}
