import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TimeWindow, AxisLabelVM, CoverageItemVM, CoverageItem } from '../model/coverage.model';

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

  createAxisLabels(timeWindow: TimeWindow): Array<AxisLabelVM> {
    const tw = this.createTimeWindow(timeWindow);
    const monthsCount = this.getMonthsDifference(tw.from, tw.to);
    const monthsToIterate = this.arrayWithRange(monthsCount);

    return monthsToIterate.map(monthNumber => {
      const currentFromDate = moment(tw.from).add(monthNumber, 'month');
      const text = currentFromDate.format('MM/YY');
      const position = (monthNumber / (monthsCount - 1)) * 100;

      return { position, text };
    });
  }

  createCoverageItems(
    timeWindow: TimeWindow,
    coverageItems: Array<CoverageItem> = []): Array<CoverageItemVM> {
    const tw = this.createTimeWindow(timeWindow);

    return [
      {
        label: 'OPSOMMER Gunnar (AF-00)',
        periods: [{
          label: 'IN DELEGATION',
          position: 20,
          styleClass: 'progress-bar-striped progress-bar-animated'
        },
        {
          isEmpty: true,
          position: 30
        }, {
          label: 'IN DELEGATION',
          position: 40,
          styleClass: 'bg-danger'
        }, {
          label: 'IN DELEGATION',
          position: 10,
          styleClass: 'bg-success'
        }]
      },
    ];
  }
}
