import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | null;
  private isAuthenticated = false;

  constructor(private router: Router, private auth:AngularFireAuth) {}

  registerUser(authData: AuthData) {
    this.auth.createUserWithEmailAndPassword(authData.email,authData.password)
    .then( result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });
    
  }

  login(authData: AuthData) {
    this.auth.signInWithEmailAndPassword(authData.email,authData.password)
    .then( result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });
    this.authSuccessfully();
  }

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated=false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated=true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}
