import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Workout } from '../../app/workout/workout';
import { Step } from '../../app/step/step';

import { DbStorage } from '../../services/DbStorage';

@Component({
  selector: 'edit-workout',
  templateUrl: 'edit.html'
})
export class EditWorkout {
  selectedWorkout;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public db: DbStorage
  ) {

    this.selectedWorkout = navParams.get('item');

    this.getSteps();

    console.log('EditWorkout.constructor', this.selectedWorkout);

  }

  getSteps() {
    this.db.getSteps(this.selectedWorkout.id).then((data) => {
      this.selectedWorkout.steps = [];

      if(data.rows.length > 0) {

        for(var i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);
          let step = new Step();

          step.name = item.name;
          step.stepType = item.type;
          step.minutes = item.minutes;
          step.seconds = item.seconds;

          this.selectedWorkout.steps.push(step);
        }
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }

  dismiss(val) {
    this.viewCtrl.dismiss({'saved':val});
  }

  save() {
    console.log('save WorkoutFormComponent', this.selectedWorkout);
    //TODO validations

    this.db.createWorkout(this.selectedWorkout).then((data) => {
      if(data.rowsAffected == 1){
        console.log('saved');
        this.dismiss(true);
      }
      
    }, (error) => {
      console.log('list data error', error);
    });   
  }
}