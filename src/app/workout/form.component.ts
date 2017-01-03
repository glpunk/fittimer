import { Component, Input } from '@angular/core';

import { Workout } from './workout';
import { Step } from '../step/step';

@Component({
  selector: 'workout-form',
  templateUrl: 'form.html'
})
export class WorkoutFormComponent {
  @Input()
  workout: Workout;

  constructor (){
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
}