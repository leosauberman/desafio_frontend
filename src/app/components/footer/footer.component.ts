import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { timer, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  momentPt = moment().locale('pt-br');
  dayWeek = this.momentPt.format('dddd');
  dayMonth = this.momentPt.format('D');
  month = this.momentPt.format('MMMM');
  year = this.momentPt.format('YYYY');
  hour: Observable<string>;

  constructor() { }

  ngOnInit(): void {
    this.hour = timer(0, 1000).pipe(
      map(() => moment().format('HH:mm:ss')),
      distinctUntilChanged()
    );
  }

}
