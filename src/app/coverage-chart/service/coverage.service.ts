import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as R from 'ramda';
import { safeMap } from '../utilities/safe-map';
import {
  CoverageItem,
  CoverageItemVM,
  CoverageVM,
  DateRange,
  HorizontalAxisLabelVM
} from '../model/coverage.model';

@Injectable()
export class CoverageService {
  private readonly MONTHS = 18;

  createCoverageVM(
    items: Array<CoverageItem> = [],
    timeWindow: DateRange,
    markerDate: Date,
    resolution: string = 'month'): CoverageVM {
    const dtw = this.createDefaultTimeWindow(timeWindow, resolution);
    const axisLabels = this.createAxisLabels(dtw, resolution);
    const coverageItems = this.createCoverageItems(items, dtw);
    const dateMarker = this.createDateMarkerLabel(markerDate, dtw);

    return { axisLabels, coverageItems, dateMarker };
  }

  createDateMarkerLabel(
    markerDate: Date,
    timeWindow: DateRange): HorizontalAxisLabelVM {
    if (this.isDateMarkerValid(markerDate, timeWindow)) {
      const totalWidth = moment(timeWindow.to).diff(timeWindow.from);
      const dateFormat = this.createDateFormat('day');
      const text = moment(markerDate).format(dateFormat);
      const positionOffset = moment(markerDate).diff(timeWindow.from);
      const position = (positionOffset / totalWidth) * 100;

      return { position, text };
    }
  }

  createAxisLabels(timeWindow: DateRange, resolution: string): Array<HorizontalAxisLabelVM> {
    const labels: Array<HorizontalAxisLabelVM> = [];
    const totalWidth = moment(timeWindow.to).diff(timeWindow.from);
    let currentFromDate = moment(timeWindow.from)
      .startOf(<any>resolution)
      .add(1, <any>resolution);

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

    return safeMap((ci: CoverageItem) => {
      return {
        label: ci.label,
        periods: ci.periods
          .filter(pd => this.isRangeValid(pd.range, timeWindow))
          .map(pd => {

            const periodRange = this.prepareRange(pd.range, timeWindow);
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
    })(coverageItems);
  }

  createDefaultTimeWindow(timeWindow: DateRange = {}, resolution: string): DateRange {
    const currentMoment = moment();
    const to = timeWindow.to || currentMoment.clone()
      .endOf(<any>resolution)
      .toDate();
    const from = timeWindow.from || currentMoment.clone()
      .subtract(this.MONTHS, 'months')
      .startOf(<any>resolution)
      .toDate();

    return this.resetRangeToFullPeriod({ from, to });
  }

  resetRangeToFullPeriod(range: DateRange): DateRange {
    return {
      from: moment(range.from).startOf('day').toDate(),
      to: moment(range.to).endOf('day').toDate()
    };
  }

  prepareRange(range: DateRange, timeWindow: DateRange): DateRange {
    const from = moment.max(
      moment(R.defaultTo(timeWindow.from, range.from)),
      moment(timeWindow.from)
    ).toDate();
    const to = moment.min(
      moment(R.defaultTo(timeWindow.to, range.to)),
      moment(timeWindow.to)
    ).toDate();

    return this.resetRangeToFullPeriod(<DateRange>{ from, to });
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

  isRangeValid(range: DateRange = {}, timeWindow: DateRange = {}): boolean {

    // period validity
    if (range && range.from && range.to && range.from.getTime() > range.to.getTime()) {
      return false;
    }

    // period intersect with timeWindow
    const isFromInside = (range.from || timeWindow.to).getTime() <= timeWindow.to.getTime();
    const isToInside = (range.to || timeWindow.from).getTime() >= timeWindow.from.getTime();

    return isFromInside && isToInside;
  }

  isDateMarkerValid(markerDate: Date, timeWindow: DateRange): any {
    return markerDate &&
      moment(markerDate).isBetween(
        timeWindow.from,
        timeWindow.to
      );
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
      case 'day':
        return 'd/M/YY';
      default:
        return 'MM/YY';
    }
  }
}
