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
    let tables = ["CREATE TABLE IF NOT EXISTS workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, favorite BOOLEAN, img TEXT, createdAt TEXT, updatedAt TEXT, lastRun TEXT)"];

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

    /*this.db.executeSql("SELECT * FROM workouts", [])
    .then((data) => {
        console.log(data);
        return JSON.stringify(data);
    }, (error) => {
        return JSON.stringify(error);
    }); */
  }

  createWorkout(obj) {
    console.log('DbStorage.createWorkout', obj);

    this.db.executeSql("INSERT INTO workouts (name, description, favorite, img, createdAt, updatedAt, lastRun) VALUES ('wk 1', 'desc 1', 0, 'img', date('now'), date('now'), '')", []).then((data) => {
        console.log('success', data);
        return JSON.stringify(data);
    }, (error) => {
      console.log('error', error);
        return JSON.stringify(error);
    });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}