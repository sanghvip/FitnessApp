import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import{ Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<any>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: any;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore,
     private uiService: UIService,
     private store: Store<fromTraining.state>){}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    // this.uiService.loadingChanged.next(true);
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
      .subscribe({
        next: (exercises: Exercise[]) => {
        
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        // this.availableExercises = exercises;
        // this.exercisesChanged.next([...this.availableExercises]);

      },
      error: (error) => {        
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackBar("Error fetching exercises","",3000);
        this.exercisesChanged.next(null);
      },
    }));

      
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
    .collection('finishedExercises')
    .valueChanges()
    .subscribe((exercises) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercises as Exercise[]));
    }));
  }

  cancelSubscriptions(){
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise){
    this.db.collection('finishedExercises').add(exercise);

  }
}
