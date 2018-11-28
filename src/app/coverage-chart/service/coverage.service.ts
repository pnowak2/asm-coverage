import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TimeWindow, AxisLabel } from '../model/coverage.model';

@Injectable()
export class CoverageService {

  getMonthsDifference(from: Date, to: Date) {
    return moment(to).diff(from, 'months', false) + 1;
  }

  sanitizeTimeWindow(timeWindow: TimeWindow): TimeWindow {
    const to = timeWindow.to || moment().toDate();
    const from = timeWindow.from || moment(to)
      .subtract(19, 'months')
      .toDate();

    return { from, to };
  }

  createArray(n: number) {
    return Array.from(
      Array(n).keys()
    );
  }

  createAxisLabels(timeWindow: TimeWindow): Array<AxisLabel> {
    const tw = this.sanitizeTimeWindow(timeWindow);
    const monthsCount = this.getMonthsDifference(tw.from, tw.to);
    const monthsToIterate = this.createArray(monthsCount);

    return monthsToIterate.map(monthNumber => {
      const currentFrom = moment(tw.from).add(monthNumber, 'month');
      const text = currentFrom.format('MM/YY');
      const position = (monthNumber / (monthsCount - 1)) * 100;

      return { position, text };
    });
  }
}
