import { Component } from '@angular/core';
import { ViewController, NavParams, ToastController } from 'ionic-angular';

import { Workout } from '../../app/workout/workout';
import { Step } from '../../app/step/step';

import { DbStorage } from '../../services/DbStorage';

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
    public viewCtrl: ViewController,
    public db: DbStorage
  ) {

    let step = new Step();
    step.name = 'get ready';
    step.stepType = 'rest';
    step.minutes = 0;
    step.seconds = 0;

    this.selectedWorkout.steps.push(step);
    console.log(this.selectedWorkout);

  }

  dismiss() {
    this.viewCtrl.dismiss({'saved':true});
  }

  save() {
    console.log('save WorkoutFormComponent', this.selectedWorkout);
    //TODO validations

    this.db.createWorkout(this.selectedWorkout).then((data) => {
      if(data.rowsAffected == 1){
        console.log('saved');
        this.dismiss();
      }
      
    }, (error) => {
      console.log('list data error', error);
    });   
  }


}