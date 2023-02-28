import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer=0;
  ngOnInit(){
    this.timer = setInterval(()=>{
      this.progress = this.progress+5;
      if(this.progress>=100){
        this.progress=0;
        clearInterval(this.timer);
      }
    },1000);
  }

}
