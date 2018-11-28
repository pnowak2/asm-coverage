import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TimeWindow, AxisLabelVM, CoverageItemVM, CoverageItem, CoverageVM } from '../model/coverage.model';

@Injectable()
export class CoverageService {

  getMonthsDifference(from: Date, to: Date) {
    return moment(to).diff(from, 'months', false) + 1;
  }

  createTimeWindow(timeWindow: TimeWindow): TimeWindow {
    const to = timeWindow.to || moment().toDate();
    const from = timeWindow.from || moment(to)
      .subtract(19, 'months')
      .toDate();

    return { from, to };
  }

  arrayWithRange(range: number) {
    return Array.from(
      Array(range).keys()
    );
  }

  createCoverageVM(
    timeWindow: TimeWindow,
    cis: Array<CoverageItem> = []): CoverageVM {
    const tw = this.createTimeWindow(timeWindow);
    const axisLabels = this.createAxisLabels(tw);
    const coverageItems = this.createCoverageItems(tw, cis);

    return { axisLabels, coverageItems };
  }

  createAxisLabels(timeWindow: TimeWindow): Array<AxisLabelVM> {
    const monthsCount = this.getMonthsDifference(timeWindow.from, timeWindow.to);
    const monthsToIterate = this.arrayWithRange(monthsCount);

    return monthsToIterate.map(monthNumber => {
      const currentFromDate = moment(timeWindow.from).add(monthNumber, 'month');
      const text = currentFromDate.format('MM/YY');
      const position = (monthNumber / (monthsCount - 1)) * 100;

      return { position, text };
    });
  }

  createCoverageItems(
    timeWindow: TimeWindow,
    coverageItems: Array<CoverageItem> = []): Array<CoverageItemVM> {

    const timeWindowStart = timeWindow.from.getTime();

    return coverageItems.map(ci => {
      return {
        label: ci.label,
        periods: ci.periods.map(pd => {
          return {
            styleClass: pd.styleClass,
            label: pd.label,
            width: 50,
            offset: 40
          };
        })
      };
    });
  }
}
