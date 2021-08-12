import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerModeSwitchService {

  observableState: EventEmitter<string> = new EventEmitter<string>();
  private state: string;

  constructor() {
    this.state = "wheels";
  }

  setState(newState: string) {
    this.state = newState;
    this.observableState.next(newState);
  }
}
