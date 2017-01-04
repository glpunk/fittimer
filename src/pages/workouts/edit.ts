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
  objectToEdit;

  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public db: DbStorage
  ) {

    let copy = Object.assign({}, navParams.get('item'));
    this.objectToEdit = copy;
    this.getSteps();
  }

  getSteps() {
    this.db.getSteps(this.objectToEdit.id).then((data) => {
      this.objectToEdit.steps = [];

      if(data.rows.length > 0) {

        for(var i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);
          let step = new Step();

          step.id = item.id;
          step.name = item.name;
          step.stepType = item.type;
          step.minutes = item.minutes;
          step.seconds = item.seconds;

          this.objectToEdit.steps.push(step);
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
    console.log('save WorkoutFormComponent', this.objectToEdit);
    
    let main = this.navParams.get('item');
    main = this.objectToEdit;

    this.db.editWorkout(this.objectToEdit).then((data) => {
      if(data.rowsAffected == 1){
        console.log('saved');
        //this.selectedItem = this.objectToEdit;
        this.viewCtrl.dismiss({'saved':true, 'obj':this.objectToEdit});
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }
}