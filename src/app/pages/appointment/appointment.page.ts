import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  public currentDate: Observable<any>;

  constructor() { }

  ngOnInit() {
    this.currentDate = interval(1000).pipe(map(x => new Date()));
  }

}
