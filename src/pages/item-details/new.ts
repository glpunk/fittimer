import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Workout } from '../../app/workout/workout';

import { DbStorage } from '../../services/DbStorage'

@Component({
  selector: 'new-workout',
  templateUrl: 'new.html'
})
export class NewWorkout {
  selectedWorkout = new Workout();

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public db: DbStorage
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}