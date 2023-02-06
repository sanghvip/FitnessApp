import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// import moment from "moment";
// import { Moment } from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  minDate: Date;

  constructor(){
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 18);
  }

  ngOnInit()
  {    
  }
  

  onSubmit(form: NgForm){
console.log(form);
  }

}
