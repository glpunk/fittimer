import { Component, Input } from '@angular/core';

import { Workout } from './workout';

@Component({
  selector: 'my-workout-detail',
  template: `
    <ion-list>
      <ion-list-header>
        Workout Information
      </ion-list-header>

      <ion-item>
        <ion-input type="text" placeholder="Name" [(ngModel)]="workout.name"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input type="text" placeholder="Description" [(ngModel)]="workout.description"></ion-input>
      </ion-item>
    </ion-list>

    <div padding>
      <button ion-button color="primary" block (click)="save()">Save</button>
    </div>
  `
})
export class WorkoutDetailComponent {
  @Input()
  workout: Workout;

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