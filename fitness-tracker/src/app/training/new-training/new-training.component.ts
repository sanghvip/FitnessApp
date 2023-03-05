import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  exercises: Observable<any>;

constructor(private trainingService: TrainingService, private db: AngularFirestore){

}
onStartTraining(form:NgForm){
  this.trainingService.startExercise(form.value.exercise);
}

ngOnInit(): void {
  // this.exercises = this.trainingService.getAvailableExercises();
  console.log(this.db.collection('availableExercises').valueChanges());
}
}
