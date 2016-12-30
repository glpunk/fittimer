import { Component, Input } from '@angular/core';

import { Step } from './step';

@Component({
  selector: 'my-step-detail',
  templateUrl: 'detail.html'
})
export class StepDetailComponent {
  @Input()
  step: Step;
}