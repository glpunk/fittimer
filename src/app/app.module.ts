import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { DbStorage} from '../services/DbStorage'
import { Utils} from '../services/Utils'

import { MyApp } from './app.component';
import { WorkoutDetailPage } from '../pages/workouts/detail';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/workouts/list';
import { TabsPage } from '../pages/tabs/tabs';
import { NewWorkout } from '../pages/workouts/new';
import { EditWorkout } from '../pages/workouts/edit';

import { WorkoutFormComponent } from './workout/form.component';
import { StepFormComponent } from './step/form.component';

@NgModule({
  declarations: [
    MyApp,
    WorkoutDetailPage,
    ListPage,
    HomePage,
    TabsPage,
    NewWorkout,
    EditWorkout,
    WorkoutFormComponent,
    StepFormComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WorkoutDetailPage,
    ListPage,
    HomePage,
    TabsPage,
    NewWorkout,
    EditWorkout
  ],
  providers: [Utils, DbStorage, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
