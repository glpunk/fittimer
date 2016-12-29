import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { DbStorage } from '../../services/DbStorage'

@Component({
  selector: 'new-workout',
  templateUrl: 'new.html'
})
export class NewWorkout {
  character;
  workouts;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public db: DbStorage
  ) {
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save(obj) {
    console.log('save', obj);

    //TODO validations

    let res = this.db.createWorkout(obj);
    console.log(res);

  }
}