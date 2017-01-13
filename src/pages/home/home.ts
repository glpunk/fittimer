import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { WorkoutDetailPage } from '../workouts/detail';
import { MomentModule } from 'angular2-moment/moment.module';

import { DbStorage } from '../../services/DbStorage';
import { Utils } from '../../services/Utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  favorites: Array<{id: number, name: string, description: string, time: string, img: string, favorite: boolean}>;
  activities: Array<{id: number, name: string, description: string, time: string, img: string, when: string}>;

  constructor(public navCtrl: NavController,
  	public db: DbStorage,
    public utils: Utils,
    public moment: MomentModule
  ) {

  }

  ionViewWillEnter() {
    this.refresh(); 
  }

  itemTapped(event, item) {
    console.log('itemTapped', item);
    this.navCtrl.push(WorkoutDetailPage, {item: item});
  }

  refresh(){
    this.favorites = [];

    this.db.getFavorites().then((data) => {
      console.log('fav data', data);
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let time_str = this.utils.formatTime( (data.rows.item(i).minutes*60) + data.rows.item(i).seconds );
          this.favorites.push({
            id: data.rows.item(i).id, 
            name: data.rows.item(i).name, 
            description: data.rows.item(i).description, 
            time: time_str,
            img: data.rows.item(i).img,
            favorite: data.rows.item(i).favorite,
          });
        }
      }
    }, (error) => {
      let scope = this;
      setTimeout(function(){ scope.refresh(); },100);
    });

    this.activities = [];

    this.db.getActivities(1).then((data) => {
      console.log('Activities data', data);
      if(data.rows.length > 0) {
        for(var i = 0; i < data.rows.length; i++) {
          let time_str = this.utils.formatTime( data.rows.item(i).seconds );
          this.activities.push({
            id: data.rows.item(i).id, 
            name: data.rows.item(i).name, 
            description: data.rows.item(i).description, 
            time: time_str,
            img: data.rows.item(i).img,
            when: data.rows.item(i).createdAt
          });
        }
      }
    }, (error) => {
      let scope = this;
      setTimeout(function(){ scope.refresh(); },100);
    });
  }

}
