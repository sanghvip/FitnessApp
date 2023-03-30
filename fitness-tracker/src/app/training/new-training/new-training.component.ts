import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  private exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  constructor(
    private trainingService: TrainingService, 
    private uiService:UIService, 
    private store: Store<fromTraining.state>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableTrainings);
    this.exercises$.subscribe(data => console.log("Available trainings:"+data));
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
    //   this.exercises = exercises;
    // });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    console.log("Form value:"+form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }
  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }
}
