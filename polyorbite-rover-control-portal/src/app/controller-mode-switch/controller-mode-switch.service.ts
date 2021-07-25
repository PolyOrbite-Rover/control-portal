import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerModeSwitchService {

  observableState$: Observable<any>;
  private state = new Subject<any>();

  constructor() {
    this.observableState$ = this.state.asObservable();
  }

  observableState(newState: any) {
    this.state = newState;
  }
}
