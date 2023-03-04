import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements AfterViewInit{
  displayedColumns=['date','name','duration','calories','state'];
  data: any;
  dataSource: any;
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private trainingService: TrainingService){
    this.data = this.trainingService.getCompletedOrCancelledExercises();
    this.dataSource = new MatTableDataSource<Exercise>(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
