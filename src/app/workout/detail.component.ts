import { Component, Input } from '@angular/core';

import { Workout } from './workout';
import { Step } from '../step/step';

import { DbStorage } from '../../services/DbStorage'

@Component({
  selector: 'my-workout-detail',
  templateUrl: 'detail.html'
})
export class WorkoutDetailComponent {
  @Input()
  workout: Workout;

  constructor (public db: DbStorage){
  }

  addStep() {
    let step = new Step();
    step.name = '';
    step.stepType = 'exercise';
    step.minutes = 0;
    step.seconds = 0;

    this.workout.steps.push(step);
  }

  stepUp(index) {
    let i1 = this.workout.steps[index];
    let i2 = this.workout.steps[index-1];

    this.workout.steps[index-1] = i1;
    this.workout.steps[index] = i2;
  }

  stepDown(index) {
    let i1 = this.workout.steps[index];
    let i2 = this.workout.steps[index+1];

    this.workout.steps[index+1] = i1;
    this.workout.steps[index] = i2;
  }


  removeStep(index) {
    this.workout.steps.splice(index,1);
  }

  save() {
    console.log('save WorkoutDetailComponent', this.workout);

    //TODO validations

    /*
    this.db.createWorkout(obj).then((data) => {
      if(data.rowsAffected == 1){
        console.log('saved');
      }
      
    }, (error) => {
      console.log('list data error', error);
    });
    */
  }
}