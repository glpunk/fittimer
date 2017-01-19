import { Component, Input } from '@angular/core';

import { Camera } from 'ionic-native';

import { Workout } from './workout';
import { Step } from '../step/step';

import { Utils } from '../../services/Utils';

@Component({
  selector: 'workout-form',
  templateUrl: 'form.html'
})
export class WorkoutFormComponent {
  @Input()
  workout: Workout;
  selected = 0;

  constructor (public utils: Utils){
  }

  takePicture() {
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL
    }).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     //console.log('imageData', imageData);
     this.workout.img = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     console.log('takePicture', err);
    });
  }

  showCard(i){
    this.selected = i;
  }

  addStep() {
    let step = new Step();
    step.id = 0;
    step.name = '';
    step.stepType = 'exercise';
    step.minutes = 0;
    step.seconds = 0;
    step.color = 'white';

    this.workout.steps.push(step);

    this.showCard(this.workout.steps.length-1);
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

  copyStep(index) {
    let copy = Object.assign({}, this.workout.steps[index]);
    copy.id = 0;
    this.workout.steps.push(copy);
  }

  removeStep(index) {

    let id = this.workout.steps[index].id;
    this.workout.steps.splice(index,1);
    if(id > 0){
      this.workout.stepsToDelete.push(id);
    }
  }

  formatTime(step){
    let time = step.minutes*60 + step.seconds;
    return this.utils.formatTime(time);
  }
}