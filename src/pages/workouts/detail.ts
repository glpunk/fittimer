import { Component } from '@angular/core';

import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

import { NativeAudio } from 'ionic-native';

import { DbStorage } from '../../services/DbStorage';
import { Utils } from '../../services/Utils';

import { Speaker } from '../../services/Speaker';

import { EditWorkout } from '../workouts/edit';

@Component({
  selector: 'workout-detail',
  templateUrl: 'detail.html'
})
export class WorkoutDetailPage {
  selectedItem: any;
  steps: Array<any>;
  totalSeconds: number;
  currentStep: number;
  speaker;
  playing;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public db: DbStorage,
    public utils: Utils

    ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.getSteps();
    this.currentStep = -1;
    this.speaker = new Speaker();

    this.playing = false; 

    NativeAudio.preloadComplex('beep', 'assets/sounds/pow_backpack.wav',1,1,0);
    NativeAudio.preloadComplex('whistle', 'assets/sounds/Whistle.wav',1,1,0);
  }

  play() {
    this.playing = true;
    this.nextSecond();
  }
  
  pause() {
    this.playing = !this.playing;
    this.nextSecond();
  }

  nextStep() {
    this.currentStep++;

    if(this.currentStep == this.steps.length){
      this.speaker.add('workout completed');
      this.getSteps();
      this.playing = false;
      this.currentStep = -1;
      return;
    }

    let step = this.steps[this.currentStep];
    this.speaker.add( step.name );

    if(step.stepType == 'rest' && (this.currentStep+1) < this.steps.length){
      this.speaker.add('next step');
      this.speaker.add(this.steps[this.currentStep+1].name);
    }
    this.nextSecond();
  }

  nextSecond() {
    console.log('nextSecond', this.totalSeconds);
    let s = this.steps[this.currentStep];

    if(this.currentStep == -1 || s.seconds == 0){
      this.nextStep();
      return;
    }

    this.totalSeconds--;
    s.seconds--;
    
    this.playSounds(s.seconds);

    let scope = this;
    
    setTimeout(function(){
      if(scope.playing){
        scope.nextSecond();
      }
    }, 1000);
  }

  playSounds(sec) {

    if(sec <= 3 && sec > 0){
      NativeAudio.play('beep');
    }

    if(sec == 0){
      NativeAudio.play('whistle');
    }
  }

  getSteps() {
    console.log('selectedItem',this.selectedItem);
    this.db.getSteps(this.selectedItem.id).then((data) => {
      if(data.rows.length > 0) {
        this.steps = [];
        this.totalSeconds = 0;
        for(var i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);

          let stepSeconds = (item.minutes * 60) + (item.seconds);

          this.steps.push({
            name: item.name, 
            seconds: stepSeconds,
            stepType: item.type
          });

          this.totalSeconds += stepSeconds;
        }
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }

  stepTime(step) {
    return step.minutes + ':' + step.seconds;
  }

  refresh(data) {
    this.selectedItem = data.obj;
    this.getSteps();
  }

  edit() {
    let modal = this.modalCtrl.create(EditWorkout, {item: this.selectedItem});
    modal.onDidDismiss(data => {
      if(data.saved == true){
        this.refresh(data);
        this.utils.presentToast('Workout saved!'); 
      }
    });
    modal.present();
  }

  dismiss() {
    this.playing = false;
    this.viewCtrl.dismiss({'deleted':false});
  }

  formatTime(str){
    return this.utils.formatTime(str);
  }

  delete() {
    this.db.deleteWorkout(this.selectedItem.id).then((data) => {
      console.log(data);
      if(data.rowsAffected == 1) {
        this.viewCtrl.dismiss({'deleted':true});
      }
    }, (error) => {
      console.log('deleteWorkout error', error);
    }); 
  }
}
