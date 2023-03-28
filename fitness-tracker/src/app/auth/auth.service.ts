import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';
// import { Store } from '@ngrx/store/src';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | null;
  private isAuthenticated = false;

  constructor(private router: Router,
    private auth:AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService,
    private store:Store<{ui: fromApp.State}>) {}

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
    // this.uiService.loadingChanged.next(true);

    this.store.dispatch({type:"START_LOADING"});
    this.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then( result => {
      // this.uiService.loadingChanged.next(false);
      this.store.dispatch({type:"STOP_LOADING"});
    })
    .catch(error => {
      // this.uiService.loadingChanged.next(false);
      this.store.dispatch({type:"STOP_LOADING"});
      this.uiService.showSnackBar(error.message,"",3000);
    });
    
  }

  login(authData: AuthData) {
    // this.uiService.loadingChanged.next(true);
    this.store.dispatch({type:"START_LOADING"});
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then( result => {
      // console.log(result);
      // this.uiService.loadingChanged.next(false);
      this.store.dispatch({type:"STOP_LOADING"});
    })
    .catch(error => {
      // this.uiService.loadingChanged.next(false);
      this.store.dispatch({type:"STOP_LOADING"});
      this.uiService.showSnackBar(error.message,"",3000);
    });
  }

  logout() {
   this.auth.signOut(); 
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
