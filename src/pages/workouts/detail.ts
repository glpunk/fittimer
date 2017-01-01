import { Component } from '@angular/core';

import { NavController, NavParams, ViewController } from 'ionic-angular';

import { DbStorage } from '../../services/DbStorage'

import { Speaker } from '../../services/Speaker'

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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController,
    public db: DbStorage
    ) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.getSteps();
    this.currentStep = -1;
    this.speaker = new Speaker();
  }

  play() {
    this.nextStep();
  }

  nextStep() {
    this.currentStep++;
    let step = this.steps[this.currentStep];
    this.speaker.add( step.name );

    if(step.stepType == 'rest'){
      this.speaker.add('next step');
      this.speaker.add(this.steps[this.currentStep+1].name);
    }
    this.nextSecond();
  }

  nextSecond() {
    console.log('nextSecond', this.totalSeconds);
    this.totalSeconds--;
    let scope = this;
    setTimeout(function(){
      scope.nextSecond();
    }, 1000);
  }

  getSteps() {
    console.log('selectedItem',this.selectedItem);
    this.db.getSteps(this.selectedItem.id).then((data) => {
      if(data.rows.length > 0) {
        this.steps = [];
        this.totalSeconds = 0;
        for(var i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);
          console.log(item);
          this.steps.push({
            name: item.name, 
            minutes: item.minutes,
            seconds: item.seconds,
            stepType: item.type
          });

          this.totalSeconds += (item.minutes * 60);
          this.totalSeconds += (item.seconds);
        }
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }

  totalTime() {
    let time = this.totalSeconds;
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    let minstr = minutes.toString();
    let secstr = seconds.toString();

    if(minutes < 10) minstr += '0' + minstr;
    if(seconds < 10) secstr += '0' + secstr;

    return minstr + ':' + secstr;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
