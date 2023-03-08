import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Observable<any>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.exercises = this.db
      .collection('availableExercises')
      .valueChanges();
      this.exercises.subscribe(result => console.log("Data from firebase:"+result));
      // console.log("Exercise data:"+this.exercises);
  }

  onStartTraining(form: NgForm) {
    console.log("Form value:"+form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }
}
