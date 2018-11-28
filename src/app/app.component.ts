import { Component } from '@angular/core';
import { DateRange, CoverageItem } from './coverage-chart/model/coverage.model';
import * as moment from 'moment';

@Component({
  selector: 'asm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timeWindow: DateRange;
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
          range: {
            from: moment('17/03/2017', 'DD-MM-YYYY').toDate(),
            to: moment('30/09/2019', 'DD-MM-YYYY').toDate()
          }
        },
        {
          range: {
            from: moment('24/08/2017', 'DD-MM-YYYY').toDate(),
            to: moment('16/01/2018', 'DD-MM-YYYY').toDate()
          },
          styleClass: 'bg-danger'
        }]
      },
    ];
  }

  onBarClick(evt) {
    console.log('bar click', evt);
  }
}
