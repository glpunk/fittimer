import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Workout } from '../../app/Workout'

import { DbStorage } from '../../services/DbStorage'

@Component({
  selector: 'new-workout',
  templateUrl: 'new.html'
})
export class NewWorkout {
  character;
  workout: Workout = {  
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
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    console.log('save new', this.workout);

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