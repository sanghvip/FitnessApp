import {NgModule} from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations:[
        SignupComponent,
        LoginComponent,],
    imports:[],
    exports:[]
})
export class AuthModule{}