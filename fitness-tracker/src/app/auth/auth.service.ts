import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | null;
  private isAuthenticated = false;

  constructor(private router: Router,
    private auth:AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService) {}

  initAuthListener(){
    this.auth.authState.subscribe( user => {
      if(user){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      }
      else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then( result => {
      console.log(result);
    })
    .catch(error => {
      this.snackbar.open(error.message, "", 
        {duration: 3000});
    });
    
  }

  login(authData: AuthData) {
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then( result => {
      console.log(result);
    })
    .catch(error => {
      this.snackbar.open(error.message, "", 
        {duration: 3000});
    });
  }

  logout() {
   this.auth.signOut(); 
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
