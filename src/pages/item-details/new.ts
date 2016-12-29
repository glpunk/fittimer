import { Component } from '@angular/core';

import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'new-workout',
  templateUrl: 'new.html'
})
export class NewWorkout {
  character;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log('params', this.params);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}