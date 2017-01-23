export class Workout {
  id: Number;
  name: String;
  description: String;
  favorite: Boolean;
  img: String;
  createdAt: Date;
  updatedAt: Date;
  lastRun: Date;
  steps: Array<any>;
  stepsToDelete: Array<any>;
}