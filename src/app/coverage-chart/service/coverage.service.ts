import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TimeWindow, AxisLabel } from '../model/coverage.model';

@Injectable()
export class CoverageService {
  constructor() { }

  createTimeWindow(timeWindow: TimeWindow = {}): TimeWindow {
    return {};
  }

  createAxisLabels(timeWindow: TimeWindow): Array<AxisLabel> {
    const { from, to } = this.createTimeWindow(timeWindow);

    return [
      { position: 0, text: '1/18' },
      { position: 5, text: '2/18' },
      { position: 10, text: '3/18' },
      { position: 15, text: '4/18' },
      { position: 20, text: '5/18' },
      { position: 25, text: '6/18' },
      { position: 30, text: '7/18' },
      { position: 35, text: '8/18' },
      { position: 40, text: '9/18' },
      { position: 45, text: '10/18' },
      { position: 50, text: '11/18' },
      { position: 55, text: '1/18' },
      { position: 60, text: '2/18' },
      { position: 65, text: '3/18' },
      { position: 70, text: '4/18' },
      { position: 75, text: '5/18' },
      { position: 80, text: '6/18' },
      { position: 85, text: '7/18' },
      { position: 90, text: '8/18' },
      { position: 95, text: '9/18' },
      { position: 100, text: '10/18' },
    ];
  }
}
