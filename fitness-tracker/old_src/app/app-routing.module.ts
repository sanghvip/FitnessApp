import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AuthGurad } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { TrainingComponent } from "./training/training.component";
import { WelcomeComponent } from "./welcome/welcome.component";

const routes: Routes=[
{path:'',component:WelcomeComponent},
{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
{path:'training',component:TrainingComponent, canActivate:[AuthGurad]}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule],
    providers:[AuthGurad]
})
export class AppRoutingModule{
    
}