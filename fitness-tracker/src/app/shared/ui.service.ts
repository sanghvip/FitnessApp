import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Subject} from 'rxjs';

@Injectable()
export class UIService {
    loadingChanged = new Subject<boolean>();

    constructor(private snackbar: MatSnackBar){}

    showSnackBar(message: string,action: string|undefined,duration: number){
        this.snackbar.open(message,action,{duration:duration});
    }

}