import { Component } from '@angular/core';
import { TimeWindow, CoverageItem } from './coverage-chart/model/coverage.model';
import * as moment from 'moment';

@Component({
  selector: 'asm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timeWindow: TimeWindow;
  coverageItems: Array<CoverageItem>;

  constructor() {
    this.timeWindow = {
      from: moment('1/05/2017', 'DD-MM-YYYY').toDate(),
      to: moment('3/08/2018', 'DD-MM-YYYY').toDate()
    };

    this.coverageItems = [
      {
        label: 'OPSOMMER Gunnar (AF-00)',
        periods: [{
          label: 'IN DELEGATION',
          from: moment('1/03/2017', 'DD-MM-YYYY').toDate(),
          to: moment('1/06/2017', 'DD-MM-YYYY').toDate(),
        },
        {
          from: moment('1/08/2017', 'DD-MM-YYYY').toDate(),
          to: moment('1/011/2017', 'DD-MM-YYYY').toDate(),
        }]
      },
    ];
  }

  onBarClick(evt) {
    console.log('bar click', evt);
  }
}
