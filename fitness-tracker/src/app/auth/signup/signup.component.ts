import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import {Subscription} from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy{
  maxDate: any;
  isLoading = false;
  private loadingSubs: Subscription;

  constructor(private authService: AuthService, private uiService:UIService) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingChanged.subscribe(isLoading => {
      this.isLoading = isLoading;

    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }
ngOnDestroy(): void {
  this.loadingSubs.unsubscribe();
}
}
