import { Component } from '@angular/core';
import { DateRange, CoverageItem, CoveragePeriodEvent } from './coverage-chart/model/coverage.model';
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
      from: moment('1/5/2017', 'DD-MM-YYYY').toDate(),
      to: moment('1/9/2018', 'DD-MM-YYYY').toDate()
    };

    this.coverageItems = [
      {
        label: 'OPSOMMER Gunnar (AF-00)',
        periods: [{
          range: {
            from: moment('1/6/2017', 'DD-MM-YYYY').toDate(),
            to: moment('1/12/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: 'IMPORTANT',
          styleClass: 'bg-danger',
          range: {
            from: moment('1/1/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/5/2018', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: 'OTHER',
          styleClass: 'bg-success',
          range: {
            from: moment('1/6/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/7/2018', 'DD-MM-YYYY').toDate()
          }
        }]
      },
      {
        label: 'OPSOMMER Erica (CJ)',
        periods: [{
          label: 'IN DELEGATION',
          range: {
            from: moment('1/6/2016', 'DD-MM-YYYY').toDate(),
            to: moment('1/6/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: 'IMPORTANT',
          styleClass: 'bg-info',
          range: {
            from: moment('1/3/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/5/2019', 'DD-MM-YYYY').toDate()
          }
        }]
      },
      {
        label: 'OPSOMMER Angela (EF-01)',
        periods: [{
          label: 'THE ONE',
          range: {
            from: moment('1/1/2016', 'DD-MM-YYYY').toDate(),
            to: moment('1/3/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          range: {
            from: moment('1/9/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/5/2019', 'DD-MM-YYYY').toDate()
          }
        }]
      }
    ];
  }

  onBarClick(evt: CoveragePeriodEvent) {
    console.log('bar click', evt);
  }
}
