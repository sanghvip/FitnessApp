import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGurad implements CanActivate {

    constructor(private authService: AuthService,private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
    {
        if(this.authService.isAuth()){
            return true;
        }
        else{
            this.router.navigate(['/login']);

        }
        return false;
    }

}