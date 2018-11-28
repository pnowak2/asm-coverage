import { Component } from '@angular/core';
import { TimeWindow } from './coverage-chart/model/coverage.model';
import * as moment from 'moment';

@Component({
  selector: 'asm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timeWindow: TimeWindow;

  constructor() {
    this.timeWindow = {
      // from: moment('1/05/2017', 'DD-MM-YYYY').toDate(),
      // to: moment('3/08/2018', 'DD-MM-YYYY').toDate()
    };
  }

  onBarClick(evt) {
    console.log('bar click', evt);
  }
}
