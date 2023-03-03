import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  exercises: Exercise[] = [];

constructor(private trainingService: TrainingService){

}
onStartTraining(){
  this.trainingService.startExercise();
}

ngOnInit(): void {
  this.exercises = this.trainingService.getAvailableExercises();
}
}
