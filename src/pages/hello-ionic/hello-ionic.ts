import { Component } from '@angular/core';
import { TextToSpeech } from 'ionic-native';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor() {

  }

  error_msg = '';

  speech(event, item) {
    TextToSpeech.speak({
            text: 'Next step',
            rate: 1.5
        })
      .then(() => {
        console.log('Success')
        TextToSpeech.speak({
            text: 'jumping jacks',
            rate: 1.5
        })
          .then(() => {
            console.log('Success')
          })
          .catch((reason: any) => this.error_msg = reason );
      })
      .catch((reason: any) => this.error_msg = reason );
  }
}
