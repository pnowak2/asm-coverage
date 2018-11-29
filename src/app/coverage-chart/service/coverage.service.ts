import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DateRange, HorizontalAxisLabelVM, CoverageItemVM, CoverageItem, CoverageVM } from '../model/coverage.model';

@Injectable()
export class CoverageService {
  private readonly MONTHS = 19;

  createCoverageVM(
    items: Array<CoverageItem> = [],
    timeWindow: DateRange): CoverageVM {
    const dtw = this.createDefaultTimeWindow(timeWindow);
    const axisLabels = this.createAxisLabels(dtw);
    const coverageItems = this.createCoverageItems(items, dtw);

    return { axisLabels, coverageItems };
  }

  createAxisLabels(timeWindow: DateRange): Array<HorizontalAxisLabelVM> {
    const monthsCount = this.getMonthsCountInRange(timeWindow);
    const monthsToIterate = this.arrayOfItems(monthsCount);
    const totalWidth = timeWindow.to.getTime() - timeWindow.from.getTime();

    return monthsToIterate.map(monthNumber => {
      const currentFromDate = moment(timeWindow.from).add(monthNumber, 'month');
      const text = currentFromDate.format('MM/YY');
      const positionOffset = currentFromDate.toDate().getTime() - timeWindow.from.getTime();
      const position = (positionOffset / totalWidth) * 100;

      return { position, text };
    });
  }

  createCoverageItems(
    coverageItems: Array<CoverageItem> = [],
    timeWindow: DateRange): Array<CoverageItemVM> {

    return coverageItems.map(ci => {
      return {
        label: ci.label,
        periods: ci.periods
          .map(pd => {
            const periodRange = this.limitRangeToTimeWindow(pd.range, timeWindow);
            const width = this.calculatePeriodPercentageWidth(periodRange, timeWindow);
            const offset = this.calculatePeriodPercentageOffset(periodRange, timeWindow);

            return {
              styleClass: pd.styleClass,
              label: pd.label,
              width: width,
              offset: offset,
              originalPeriod: pd
            };
          })
      };
    });
  }

  getMonthsCountInRange(range: DateRange): number {
    return moment(range.to).diff(range.from, 'months', false) + 1;
  }

  createDefaultTimeWindow(timeWindow: DateRange): DateRange {
    const to = timeWindow.to || moment().toDate();
    const from = timeWindow.from || moment(to)
      .subtract(this.MONTHS, 'months')
      .toDate();

    return this.resetRangeToBeginningOfMonth({ from, to });
  }

  resetRangeToBeginningOfMonth(range: DateRange): DateRange {
    return {
      from: moment(range.from).startOf('month').toDate(),
      to: moment(range.to).startOf('month').toDate()
    };
  }

  limitRangeToTimeWindow(range: DateRange, timeWindow: DateRange): DateRange {
    const from = moment.max(moment(range.from), moment(timeWindow.from)).toDate();
    const to = moment.min(moment(range.to), moment(timeWindow.to)).toDate();

    return { from, to };
  }

  calculatePeriodPercentageWidth(period: DateRange, timeWindow: DateRange): number {
    const totalWidth = timeWindow.to.getTime() - timeWindow.from.getTime();
    const periodWidth = period.to.getTime() - period.from.getTime();

    return (periodWidth / totalWidth) * 100;
  }

  calculatePeriodPercentageOffset(period: DateRange, timeWindow: DateRange): number {
    const totalWidth = timeWindow.to.getTime() - timeWindow.from.getTime();
    const windowFrom = timeWindow.from.getTime();
    const periodFrom = period.from.getTime();

    return ((periodFrom - windowFrom) / totalWidth) * 100;
  }

  arrayOfItems(n: number) {
    return Array.from(
      Array(n).keys()
    );
  }
}
