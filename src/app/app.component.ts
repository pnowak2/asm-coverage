import { Component } from '@angular/core';
import { DateRange, CoverageItem, CoverageEvent } from './coverage-chart/model/coverage.model';
import * as moment from 'moment';

@Component({
  selector: 'asm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timeWindow: DateRange;
  coverageItems: Array<CoverageItem>;
  resolution: string;
  markerDate = moment('18/5/2018', 'DD-MM-YYYY').toDate();

  constructor() {
    this.timeWindow = {
      from: moment('1/5/2017', 'DD-MM-YYYY').toDate(),
      to: moment('1/9/2018', 'DD-MM-YYYY').toDate()
    };

    this.coverageItems = [
      {
        label: 'OPSOMMER Gunnar (AF-00)',
        periods: [{
          styleClass: 'progress-bar-striped progress-bar-striped--green',
          range: {
            from: moment('1/6/2017', 'DD-MM-YYYY').toDate(),
            to: moment('30/11/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: 'Delegation',
          styleClass: 'ux-u-bg-color-danger',
          range: {
            from: moment('1/1/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/5/2018', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: 'OTHER',
          styleClass: 'ux-u-bg-color-success',
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
            to: moment('1/11/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: 'Conditional',
          styleClass: 'ux-u-bg-color-info',
          range: {
            from: moment('1/3/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/5/2019', 'DD-MM-YYYY').toDate()
          }
        }]
      },
      {
        label: 'OPSOMMER Angela (EF-01)',
        periods: [{
          label: 'Partial coverage',
          styleClass: 'ux-u-bg-color-warning',
          range: {
            from: moment('16/7/2017', 'DD-MM-YYYY').toDate(),
            to: moment('20/2/2018', 'DD-MM-YYYY').toDate()
          }
        },
        {
          label: '(Greece)',
          styleClass: 'progress-bar-striped ux-u-bg-color-danger',
          range: {
            from: moment('1/4/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/8/2018', 'DD-MM-YYYY').toDate()
          }
        }]
      },
      {
        label: 'OPSOMMER Emilie (EF-02)',
        periods: [{
          styleClass: 'ux-u-bg-color-success',
          range: {
            from: moment('1/10/2017', 'DD-MM-YYYY').toDate(),
            to: moment('1/6/2018', 'DD-MM-YYYY').toDate()
          }
        }]
      },
      {
        label: 'OPSOMMER Tom (EF-03)',
        periods: [{
          styleClass: 'progress-bar-striped progress-bar-striped--blue ux-u-bg-color-warning',
          range: {
            from: moment('1/6/2017', 'DD-MM-YYYY').toDate(),
            to: moment('1/8/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          styleClass: 'progress-bar-striped progress-bar-striped--red ux-u-bg-color-warning',
          range: {
            from: moment('1/9/2017', 'DD-MM-YYYY').toDate(),
            to: moment('1/11/2017', 'DD-MM-YYYY').toDate()
          }
        },
        {
          styleClass: 'progress-bar-striped progress-bar-striped--green ux-u-bg-color-warning',
          range: {
            from: moment('1/12/2017', 'DD-MM-YYYY').toDate(),
            to: moment('1/2/2018', 'DD-MM-YYYY').toDate()
          }
        },
        {
          styleClass: 'progress-bar-striped progress-bar-striped--orange',
          range: {
            from: moment('1/3/2018', 'DD-MM-YYYY').toDate(),
            to: moment('1/5/2018', 'DD-MM-YYYY').toDate()
          }
        }]
      }
    ];
  }

  onBarClick(evt: CoverageEvent) {
    console.log('bar click', evt);
  }

  onBarMouseover(evt: CoverageEvent) {
    console.log('bar mouse over', evt);
  }

  onBarMouseout(evt: CoverageEvent) {
    console.log('bar mouse out', evt);
  }

  onResolutionClick(resolution: string) {
    this.resolution = resolution;
  }

  moveTimeWindowUp() {
    this.timeWindow = {
      from: moment(this.timeWindow.from).add(1, 'months').toDate(),
      to: moment(this.timeWindow.to).add(1, 'months').toDate()
    };
  }

  moveTimeWindowDown() {
    this.timeWindow = {
      from: moment(this.timeWindow.from).subtract(1, 'months').toDate(),
      to: moment(this.timeWindow.to).subtract(1, 'months').toDate()
    };
  }
}
