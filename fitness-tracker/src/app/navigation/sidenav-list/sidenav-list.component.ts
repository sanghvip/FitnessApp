import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
@Output() closeSidenav = new EventEmitter<void>();
isAuth = false;

constructor(private authService:AuthService){

}

  onClose(){
    this.closeSidenav.emit();
    this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

}
