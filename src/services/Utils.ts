import {Injectable, Inject} from '@angular/core';
import { ToastController } from 'ionic-angular';

export class Utils{

  constructor(
    @Inject(ToastController) private toastCtrl: ToastController
  ) {}

  presentToast(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    let minstr = minutes.toString();
    let secstr = seconds.toString();

    if(minutes < 10) minstr = '0' + minstr;
    if(seconds < 10) secstr = '0' + secstr;

    return minstr + ':' + secstr;
  }
}