import { SQLite } from 'ionic-native';

export class DbStorage{
  db;

  constructor(){
    console.log('DbStorage.constructor');
    this.db = new SQLite();
  }

  openDb() {
    this.db.openDatabase({
      name: 'data2.db',
      location: 'default' // the location field is required
    }).then(() => {
      console.log('database opened');
      this.createTables();
    }, (err) => {
      console.error('Unable to open database: ', err);
    });
  }

  createTables(){
    let tables = [];
    tables.push("CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, favorite BOOLEAN, img TEXT, createdAt TEXT, updatedAt TEXT, lastRun TEXT)");
    tables.push("CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY AUTOINCREMENT, id_workout INTEGER, name TEXT, type TEXT, minutes INTEGER, seconds INTEGER, color INTEGER, position INTEGER, createdAt TEXT, updatedAt TEXT, lastRun TEXT)");
    tables.push("CREATE INDEX workout_index ON steps (id_workout);");

    for(let i in tables){
      this.db.executeSql(tables[i], {}).then((data) => {
          console.log("TABLE CREATED: ", data);
      }, (error) => {
          console.error("Unable to execute sql", error);
      })
    }
  }

  getWorkouts(): Promise<any> {
    console.log('getWorkouts');
    
    return this.db.executeSql("SELECT w.*, SUM(s.minutes) as minutes, SUM(s.seconds) as seconds FROM workouts w JOIN steps s ON s.id_workout = w.id GROUP BY s.id_workout", [])
               .then(response => response)
               .catch(this.handleError);
  }

  getSteps(id): Promise<any> {
    console.log('getSteps', id);
    
    return this.db.executeSql("SELECT * FROM steps WHERE id_workout = ? order by position ASC", [id])
               .then(response => response)
               .catch(this.handleError);
  }  

  createWorkout(obj): Promise<any> {
    console.log('DbStorage.createWorkout', obj);

    return this.db.executeSql("INSERT INTO workouts (name, description, favorite, img, createdAt, updatedAt, lastRun) VALUES (?, ?, 0, 'img', date('now'), date('now'), '')", [obj.name, obj.description])
            .then( (response) => {
              console.log(response);

              let w_id = response.insertId;

              console.log('saving steps -----');

              let i = 0;
              for(let step of obj.steps){
                let res = this.db.executeSql("INSERT INTO steps (id_workout, name, type, minutes, seconds, color, position, createdAt, updatedAt, lastRun) VALUES (?, ?, ?, ?, ?, ?, ?, date('now'), date('now'), '')", [w_id, step.name, step.stepType, step.minutes, step.seconds, '', i]);
                i++;
                console.log(res);
              }
              return response;

            }).catch(this.handleError);
  }

  deleteWorkout(id): Promise<any> {
    console.log('deleteWorkout', id);
    
    this.db.executeSql("delete from steps WHERE id_workout = ?", [id]);

    return this.db.executeSql("delete from workouts WHERE id = ?", [id])
               .then(response => response)
               .catch(this.handleError);
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    let minstr = minutes.toString();
    let secstr = seconds.toString();

    if(minutes < 10) minstr = '0' + minstr;
    if(seconds < 10) secstr = '0' + secstr;

    return minstr + ':' + secstr;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}