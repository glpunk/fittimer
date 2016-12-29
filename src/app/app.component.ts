import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { DbStorage} from '../services/DbStorage'

import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;

  constructor(
    platform: Platform,
    public db: DbStorage,
    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      db.openDb();      
      Splashscreen.hide();
    });
  }

}
