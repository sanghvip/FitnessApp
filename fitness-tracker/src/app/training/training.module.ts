import {NgModule} from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PastTrainingComponent } from 'old_src/app/training/past-training/past-training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';

@NgModule({
declarations:[TrainingComponent,
CurrentTrainingComponent,
NewTrainingComponent,
PastTrainingComponent,
StopTrainingComponent],
imports:[AngularFirestoreModule],
entryComponents:[StopTrainingComponent]})

export class TrainingModule{}