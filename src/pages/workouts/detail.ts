import { Component, ViewChild } from '@angular/core';

import { NavController, NavParams, ViewController, ModalController, AlertController, Content, ActionSheetController } from 'ionic-angular';

import { NativeAudio, PowerManagement } from 'ionic-native';

import { DbStorage } from '../../services/DbStorage';
import { Utils } from '../../services/Utils';

import { Speaker } from '../../services/Speaker';

import { EditWorkout } from '../workouts/edit';

@Component({
  selector: 'workout-detail',
  templateUrl: 'detail.html'
})
export class WorkoutDetailPage {
  @ViewChild(Content) content: Content;
  selectedItem: any;
  steps: Array<any>;
  totalSeconds: number;
  currentStep: number;
  speaker;
  playing;
  interval;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
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
    PowerManagement.acquire();
    this.playing = true;

    let scope = this;
    this.interval = setInterval(function(){
      scope.nextSecond();
    }, 1000);
  }
  
  pause() {
    this.playing = !this.playing;
    clearInterval(this.interval);
  }

  reset() {
    PowerManagement.release();
    this.getSteps();
    this.playing = false;
    this.currentStep = -1;
    clearInterval(this.interval);
  }

  nextStep() {
    this.currentStep++;

    if(this.currentStep == this.steps.length){
      this.speaker.add('workout completed');
      this.reset();
      return;
    }

    let step = this.steps[this.currentStep];
    this.speaker.add( step.name );

    if(step.stepType == 'rest' && (this.currentStep+1) < this.steps.length){
      this.speaker.add('next step');
      this.speaker.add(this.steps[this.currentStep+1].name);
    }

    this.scrollToItem();
  }

  ionViewWillLeave() {
    this.reset();
  }

  scrollToItem() {
    try{
      let item = document.getElementsByClassName('active')[0];
      this.content.scrollTo(0,(item.clientHeight)*this.currentStep,300);
    } catch(err){}
  }

  nextSecond() {
    let s = this.steps[this.currentStep];

    if(this.currentStep == -1 || s.seconds == 0){
      this.nextStep();
      return;
    }

    this.totalSeconds--;
    s.seconds--;
    
    this.playSounds(s.seconds);
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
            stepType: item.type,
            color: item.color
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
    clearInterval(this.interval);
    this.viewCtrl.dismiss({'deleted':false});
  }

  formatTime(str){
    return this.utils.formatTime(str);
  }

  delete() {

    let confirm = this.alertCtrl.create({
      title: 'Are you sure?',
      message: 'This workout will be deleted forever =(',
      buttons: [
        {
          text: 'NO!',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'YESSS',
          handler: () => {
            this.db.deleteWorkout(this.selectedItem.id).then((data) => {
              if(data.rowsAffected == 1) {
                this.viewCtrl.dismiss({'deleted':true});
              }
            }, (error) => {
              console.log('deleteWorkout error', error);
            });
          }
        }
      ]
    });
    confirm.present();

  }

  colorCell(step) {

    let color = '';
    if(step.color == '#000000'){
      color = 'white';
    } else {
      color = 'black'; 
    }

    let obj = {
      'background-color': step.color,
      'color': color
    }

    return obj;
  }

  presentActionSheet() {
    console.log('presentActionSheet');
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify workout',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.delete();
          }
        },{
          text: 'Edit',
          icon: 'create',
          handler: () => {
            this.edit();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
