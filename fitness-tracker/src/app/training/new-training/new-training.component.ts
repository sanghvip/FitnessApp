import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoading = true;
  private loadingSubsciption: Subscription;

  constructor(
    private trainingService: TrainingService, private uiService:UIService) {}

  ngOnInit() {
    this.loadingSubsciption = this.uiService.loadingChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    console.log("Form value:"+form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }
  fetchExercises(){
    this.trainingService.fetchAvailableExercises();
  }
  ngOnDestroy(): void {
    if(this.exerciseSubscription){
      this.exerciseSubscription.unsubscribe();
    }
    if(this.loadingSubsciption){
      this.loadingSubsciption.unsubscribe();
    }    
  }
}
