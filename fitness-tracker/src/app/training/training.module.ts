import {NgModule} from '@angular/core';

import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { MaterialModule } from '../material.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingComponent } from './training.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
declarations:[
    TrainingComponent,
CurrentTrainingComponent,
NewTrainingComponent,
PastTrainingsComponent,
StopTrainingComponent
],
imports:[
    SharedModule,
    TrainingRoutingModule
],
entryComponents:[StopTrainingComponent]})

export class TrainingModule{}