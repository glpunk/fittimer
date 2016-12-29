import { Component } from '@angular/core';

import { NavController, ModalController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { NewWorkout } from '../item-details/new';

import { DbStorage } from '../../services/DbStorage'

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{name: string, description: string}>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
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
            this.items.push({name: data.rows.item(i).name, description: data.rows.item(i).description});
        }
      }
    }, (error) => {
      console.log('list data error', error);
    });
  }

  itemTapped(event, item) {
    console.log('itemTapped', item);
    let modal = this.modalCtrl.create(ItemDetailsPage, {item: item});
    modal.present();
  }

  openModal(characterNum) {
    console.log('openModal', characterNum);
    let modal = this.modalCtrl.create(NewWorkout, characterNum);
    modal.present();
  }
}
