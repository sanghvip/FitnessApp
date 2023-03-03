import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent {
  displayedColumns=['date','name','duration','calories','state'];
  data: any;
  dataSource: any;
  constructor(private trainingService: TrainingService){
    this.data = this.trainingService.getCompletedOrCancelledExercises();
    this.dataSource = new MatTableDataSource<Exercise>(this.data);

  }
}
