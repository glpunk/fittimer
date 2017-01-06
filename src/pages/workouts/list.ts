import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';
import { WorkoutDetailPage } from '../workouts/detail';
import { NewWorkout } from '../workouts/new';

import { DbStorage } from '../../services/DbStorage'
import { Utils } from '../../services/Utils'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{id: number, name: string, description: string, time: string, img: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    public db: DbStorage,
    public utils: Utils
    ) {

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }

  ionViewWillEnter() {
    this.refresh(); 
  }

  refresh(){
    this.items = [];

    this.db.getWorkouts().then((data) => {
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let time_str = this.utils.formatTime( (data.rows.item(i).minutes*60) + data.rows.item(i).seconds );
          this.items.push({
            id: data.rows.item(i).id, 
            name: data.rows.item(i).name, 
            description: data.rows.item(i).description, 
            time: time_str,
            img: data.rows.item(i).img
          });
        }
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }

  itemTapped(event, item) {
    console.log('itemTapped', item);
    this.navCtrl.push(WorkoutDetailPage, {item: item});
  }

  openModal(characterNum) {
    console.log('openModal', characterNum);
    let modal = this.modalCtrl.create(NewWorkout, characterNum);
    modal.onDidDismiss(data => {
      if(data.saved == true){
        this.refresh();
        this.utils.presentToast('Workout saved!'); 
      }
    });
    modal.present();
  }
}
