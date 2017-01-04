import { TextToSpeech } from 'ionic-native';

export class Speaker{
  speeches: Array<string>;
  talking;

  constructor() {
  	this.speeches = [];
  	this.talking = false;
  }

  add(str) {
  	this.speeches.push(str);
  	this.speech();
  }

  speech (){
    console.log('speech');
    if(this.speeches.length > 0 && !this.talking){
      this.talking = true;
      let scope = this; 
      TextToSpeech.speak({
            text: this.speeches[0],
            locale: 'en-EN',
            rate: 1.4
        })
        .then(() => {
          scope.talking = false;
          scope.nextSpeech();
        })
        .catch((reason: any) => console.log(reason));    
    }
  }

  nextSpeech() {
    console.log('nextSpeech');
    this.speeches.splice(0,1);
    this.speech();
  } 
}