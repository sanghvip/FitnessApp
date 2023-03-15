import { NgModule } from "@angular/core";
import { Routes, Router, RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { TrainingComponent } from "./training.component";

const routes:Routes = [{ path: 'training', component: TrainingComponent, canActivate: [AuthGuard] }];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class TrainingRoutingModule{    
    
}
