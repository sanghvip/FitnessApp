import {Subject} from 'rxjs';

export class UIService {
    loadingChanged = new Subject<boolean>();

}