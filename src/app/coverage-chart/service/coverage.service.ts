import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { DateRange, HorizontalAxisLabelVM, CoverageItemVM, CoverageItem, CoverageVM } from '../model/coverage.model';

@Injectable()
export class CoverageService {
  private readonly MONTHS = 19;

  createCoverageVM(
    items: Array<CoverageItem> = [],
    timeWindow: DateRange,
    resolution: string = 'month'): CoverageVM {
    const dtw = this.createDefaultTimeWindow(timeWindow, resolution);
    const axisLabels = this.createAxisLabels(dtw, resolution);
    const coverageItems = this.createCoverageItems(items, dtw);

    return { axisLabels, coverageItems };
  }

  createAxisLabels(timeWindow: DateRange, resolution: string): Array<HorizontalAxisLabelVM> {
    const labels: Array<HorizontalAxisLabelVM> = [];
    const totalWidth = moment(timeWindow.to).diff(timeWindow.from);
    let currentFromDate = moment(timeWindow.from);

    while (currentFromDate.isSameOrBefore(timeWindow.to)) {
      const dateFormat = this.createDateFormat(resolution);
      const text = currentFromDate.format(dateFormat);
      const positionOffset = moment(currentFromDate).diff(timeWindow.from);
      const position = (positionOffset / totalWidth) * 100;

      labels.push({ position, text });

      currentFromDate = moment(currentFromDate).add(1, <any>resolution);
    }

    return labels;
  }

  createCoverageItems(
    coverageItems: Array<CoverageItem> = [],
    timeWindow: DateRange): Array<CoverageItemVM> {

    return coverageItems.map(ci => {
      return {
        label: ci.label,
        periods: ci.periods
          .filter(pd => this.isRangeIntersectingTimeWindow(pd.range, timeWindow))
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

  createDefaultTimeWindow(timeWindow: DateRange = {}, resolution: string): DateRange {
    const to = timeWindow.to || moment().toDate();
    const from = timeWindow.from || moment(to)
      .subtract(this.MONTHS, 'months')
      .toDate();

    return this.resetRangeToFullPeriod({ from, to }, resolution);
  }

  resetRangeToFullPeriod(range: DateRange, resolution: string): DateRange {
    return {
      from: moment(range.from)
        .startOf(<any>resolution)
        .toDate(),
      to: moment(range.to)
        .add(1, <any>resolution)
        .startOf(<any>resolution)
        .toDate()
    };
  }

  limitRangeToTimeWindow(range: DateRange, timeWindow: DateRange): DateRange {
    const from = moment.max(
      moment(range.from),
      moment(timeWindow.from)
    ).toDate();
    const to = moment.min(
      moment(range.to),
      moment(timeWindow.to)
    ).toDate();

    return { from, to };
  }

  calculatePeriodPercentageWidth(period: DateRange, timeWindow: DateRange): number {
    const totalWidth = moment(timeWindow.to).diff(timeWindow.from);
    const periodWidth = moment(period.to).diff(period.from);

    return (periodWidth / totalWidth) * 100;
  }

  calculatePeriodPercentageOffset(period: DateRange, timeWindow: DateRange): number {
    const totalWidth = moment(timeWindow.to).diff(timeWindow.from);
    const windowFrom = timeWindow.from.getTime();
    const periodFrom = period.from.getTime();

    return ((periodFrom - windowFrom) / totalWidth) * 100;
  }

  isRangeIntersectingTimeWindow(range: DateRange = {}, timeWindow: DateRange = {}): boolean {
    const isFromInside = range.from.getTime() <= timeWindow.to.getTime();
    const isToInside = range.to.getTime() >= timeWindow.from.getTime();

    return isFromInside && isToInside;
  }

  createDateFormat(resolution: string) {
    switch (resolution) {
      case 'year':
        return 'YYYY';
      case 'quarter':
        return '\\QQ/YY';
      case 'month':
        return 'M/YY';
      case 'week':
        return 'w/YY';
      default:
        return 'MM/YY';
    }
  }
}
