import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import{ Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<any>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: any;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore){}

  fetchAvailableExercises() {
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe( 
        map(docArray => {
        return docArray.map(doc => {
          return {
          ...doc.payload.doc.data() as Exercise,
          id: doc.payload.doc.id
          };
        });
      })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }));

      
  }

  startExercise(selectedId: string) {
    console.log("SelectedID of Exercise:"+selectedId);
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    );
    console.log("Exercise changed to:"+this.runningExercise);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    // console.log("Completed exercises:"+this.exercises.slice());
    // return this.exercises.slice();    
    this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises) => {
      this.finishedExercisesChanged.next(exercises as Exercise[]);
    });
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise);

  }
}
