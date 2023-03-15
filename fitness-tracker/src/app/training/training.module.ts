import {NgModule} from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { MaterialModule } from '../material.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
declarations:[
    TrainingComponent,
CurrentTrainingComponent,
NewTrainingComponent,
PastTrainingsComponent,
StopTrainingComponent
],
imports:[
    CommonModule,
    AngularFirestoreModule,
    MaterialModule,
    FlexLayoutModule,
],
entryComponents:[StopTrainingComponent]})

export class TrainingModule{}