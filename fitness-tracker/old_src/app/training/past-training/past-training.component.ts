import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  constructor(private trainingService: TrainingService){
    this.data = this.trainingService.getCompletedOrCancelledExercises();
    this.dataSource = new MatTableDataSource<Exercise>(this.data);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterValueEvent: Event){
    const target = filterValueEvent.target as HTMLInputElement;
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
    console.log(target.value.trim().toLocaleLowerCase());
  }
}
