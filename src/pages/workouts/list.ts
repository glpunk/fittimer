import { Component } from '@angular/core';

import { NavController, ModalController, NavParams, ToastController } from 'ionic-angular';
import { WorkoutDetailPage } from '../workouts/detail';
import { NewWorkout } from '../workouts/new';

import { DbStorage } from '../../services/DbStorage'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{id: number, name: string, description: string, time: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public db: DbStorage
    ) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.refresh();
  }

  refresh(){
    this.items = [];

    this.db.getWorkouts().then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let time_str = this.db.formatTime( (data.rows.item(i).minutes*60) + data.rows.item(i).seconds );
          this.items.push({id: data.rows.item(i).id, name: data.rows.item(i).name, description: data.rows.item(i).description, time: time_str});
        }
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }

  itemTapped(event, item) {
    console.log('itemTapped', item);

    this.navCtrl.push(WorkoutDetailPage, {item: item});
    /*let modal = this.modalCtrl.create(WorkoutDetailPage, {item: item});
    modal.onDidDismiss(data => {
      if(data.deleted == true){
        this.refresh();
        this.presentToast('Workout deleted!'); 
      }
      
    });
    modal.present();*/
  }

  presentToast(str) {
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  openModal(characterNum) {
    console.log('openModal', characterNum);
    let modal = this.modalCtrl.create(NewWorkout, characterNum);
    modal.onDidDismiss(data => {
      if(data.saved == true){
        this.refresh();
        this.presentToast('Workout saved!'); 
      }
    });
    modal.present();
  }
}
