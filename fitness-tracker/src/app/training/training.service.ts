import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import{ Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<any>();
  exercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [
    // { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    // { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    // { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    // { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: any;
  private exercises: Exercise[] = [];

  constructor(private db: AngularFirestore){}

  fetchAvailableExercises() {
    this.db
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
      });

      this.exercisesChanged.next({...this.availableExercises});
  }

  startExercise(selectedId: string) {
    console.log("SelectedID of Exercise:"+selectedId);
    this.runningExercise = this.availableExercises.find(
      ex => ex.name === selectedId
    );
    console.log("Exercise changed to:"+this.runningExercise);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
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

  getCompletedOrCancelledExercises() {
    console.log("Completed exercises:"+this.exercises.slice());
    return this.exercises.slice();    
  }
}
