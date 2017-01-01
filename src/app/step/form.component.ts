import { Component, Input } from '@angular/core';

import { Step } from './step';

@Component({
  selector: 'step-form',
  templateUrl: 'form.html'
})
export class StepFormComponent {
  @Input()
  step: Step;

  formatDate() {
  	var min = this.step.minutes.toString();
  	var sec = this.step.seconds.toString();

  	if(this.step.minutes < 10){ min = '0' + min; }
  	if(this.step.seconds < 10) { sec = '0' + sec; }

  	return min + ':' + sec;
  }
}