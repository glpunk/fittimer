import { SQLite } from 'ionic-native';

export class DbStorage{
  db;

  constructor(){
    console.log('DbStorage.constructor');
    this.db = new SQLite();
  }

  openDb() {
    this.db.openDatabase({
      name: 'data.db',
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
    tables.push("CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY AUTOINCREMENT, id_workout INTEGER, name TEXT, type TEXT, minutes INTEGER, seconds INTEGER, color INTEGER, createdAt TEXT, updatedAt TEXT, lastRun TEXT)");

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
    
    return this.db.executeSql("SELECT * FROM workouts", [])
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

              for(let step of obj.steps){
                let res = this.db.executeSql("INSERT INTO steps (id_workout, name, type, minutes, seconds, color, createdAt, updatedAt, lastRun) VALUES (?, ?, ?, ?, ?, ?, date('now'), date('now'), '')", [w_id, step.name, step.stepType, step.minutes, step.seconds, '']);
                console.log(res);
              }
              return response;

            }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}