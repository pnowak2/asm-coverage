import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { TimeWindow } from '../model/coverage.model';

@Injectable()
export class CoverageService {
  constructor() { }

  createAxisLabels(timeWindow: TimeWindow): Array<string> {
    return null;
  }
}
