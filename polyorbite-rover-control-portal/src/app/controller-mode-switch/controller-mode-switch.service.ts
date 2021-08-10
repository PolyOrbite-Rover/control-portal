import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerModeSwitchService {

  observableState: Observable<string>;
  private state: string;

  constructor() {
    this.state = "wheels";
    this.observableState = of(this.state);
  }

  setState(newState: string) {
    this.state = newState;
  }
}
