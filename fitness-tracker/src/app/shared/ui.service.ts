import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable
export class UIService {
    loadingChanged = new Subject<boolean>();

    showSnackBar(message,action,duration){

    }

}