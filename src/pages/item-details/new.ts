import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Workout } from '../../app/workout/workout';
import { Step } from '../../app/step/step';

@Component({
  selector: 'new-workout',
  templateUrl: 'new.html'
})
export class NewWorkout {
  selectedWorkout: Workout = {
      id: 0,
      name: '',
      description: '',
      favorite: false,
      img: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      lastRun: new Date(),
      steps: []
    };

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController
  ) {

    let step = new Step();
    step.name = 'get ready';
    step.stepType = 'rest';
    //step.time = 10;

    this.selectedWorkout.steps.push(step);
    console.log(this.selectedWorkout);

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}