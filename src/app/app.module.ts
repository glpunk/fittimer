import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DbStorage} from '../services/DbStorage'

import { MyApp } from './app.component';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { TabsPage } from '../pages/tabs/tabs';
import { NewWorkout } from '../pages/item-details/new';

import { WorkoutDetailComponent } from './workout/detail.component';
import { StepDetailComponent } from './step/detail.component';

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage,
    TabsPage,
    NewWorkout,
    WorkoutDetailComponent,
    StepDetailComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    ListPage,
    HomePage,
    TabsPage,
    NewWorkout
  ],
  providers: [DbStorage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
