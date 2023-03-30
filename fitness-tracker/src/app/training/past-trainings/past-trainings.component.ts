import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import  { Store} from '@ngrx/store';
import * as fromTraining from '../training.reducer';
@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.state>) {}

  ngOnInit() {
    this.store.select(fromTraining.getFinishedTrainings).subscribe((exercises) => {
      this.dataSource.data = exercises;
    });
    this.trainingService.fetchCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filterEvent: Event) {
    var target = filterEvent.target as HTMLTextAreaElement;
    this.dataSource.filter = target!.value.trim().toLowerCase();
  }

  // ngOnDestroy(): void {
  //   if(this.exChangedSubscription){
  //     this.exChangedSubscription.unsubscribe();
  //   }
    
  // }
}
