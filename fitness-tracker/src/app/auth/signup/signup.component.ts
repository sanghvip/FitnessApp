import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import moment from "moment";
import { Moment } from 'moment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  maxDate: Moment;

  constructor(){
    this.maxDate = moment().subtract(18,'year')
    // this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnInit()
  {    
  }
  

  onSubmit(form: NgForm){
console.log(form);
  }

}
