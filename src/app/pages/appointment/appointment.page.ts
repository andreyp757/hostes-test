import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { STATE_ACTIONS } from '../../shared/state.reducer';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  public statusSet = [
    { text: 'Planned', color: 'secondary' },
    { text: 'Done', color: 'primary' },
    { text: 'In progress', color: 'success' }
  ]
  public currentDate: Observable<any>;
  public checkboxActivated: [] = [];
  public currentDatePlusHour: any;
  public state: any;
  public activeTab: string = 'careplane';
  public isFinished: boolean = false;

  constructor(private store: Store<any>, private alertController: AlertController) { }

  ngOnInit() {
    this.currentDate = interval(1000).pipe(map(x => new Date()));
    this.currentDate.subscribe(nowDate => {
      let datePlus = new Date(nowDate);
      this.currentDatePlusHour = new Date(datePlus.setHours(datePlus.getHours() + 1));
    })
    this.state = this.store.select('stateSet'); 
  }

  changeStatus(){
    let status = this.statusSet.shift();
    this.statusSet.push(status);
    this.store.dispatch({ type: STATE_ACTIONS.SET_PROGRESS, payload: status })
  }

  async wasSwiped(){
    this.isFinished = true;
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Would you like to finish appointment?',
      buttons: [{
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.isFinished = false;
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.isFinished = false;
            this.store.dispatch({ type: STATE_ACTIONS.ADD_ITEM })
          }
      }]
    });
    await alert.present();
  }

  removeItem(id){
    this.store.dispatch({ type: STATE_ACTIONS.REMOVE_ITEM, payload: id })
  }

  tabChanged(ev: any){
    this.activeTab = ev.detail.value;
  }


}
