import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { RoverControlProxyService } from '../rover-control-proxy/rover-control-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  private forwardButtonDown: boolean;
  private backwardButtonDown: boolean;
  private leftButtonDown: boolean;
  private rightButtonDown: boolean;

  get linearVelocity(): number {
    const isNull = (!this.forwardButtonDown && !this.backwardButtonDown) ||
                   ( this.forwardButtonDown &&  this.backwardButtonDown);
    if(isNull) return 0;

    const isForward = this.forwardButtonDown;
    return isForward ? 1 : -1;
  }

  get angularVelocity(): number {
    const isNull = (!this.leftButtonDown && !this.rightButtonDown) ||
                   ( this.leftButtonDown &&  this.rightButtonDown);
    if(isNull) return 0;

    const isRight = this.rightButtonDown;
    return isRight ? 1 : -1;
  }

  private updateRoverState(): void {
    this.controlProxy.linearVelocity = this.linearVelocity;
    this.controlProxy.angularVelocity = this.angularVelocity;
  }

  constructor(private controlProxy: RoverControlProxyService) {
    fromEvent(window, 'keydown').subscribe((event: KeyboardEvent) => {
      switch(event.code) {
        case 'ArrowUp':
          this.forwardButtonDown = true;
          break;
        case 'ArrowDown':
          this.backwardButtonDown = true;
          break;
        case 'ArrowLeft':
          this.leftButtonDown = true;
          break;
        case 'ArrowRight':
          this.rightButtonDown = true;
          break;
      }
      this.updateRoverState();
    });
    fromEvent(window, 'keyup').subscribe((event: KeyboardEvent) => {
      switch(event.code) {
        case 'ArrowUp':
          this.forwardButtonDown = false;
          break;
        case 'ArrowDown':
          this.backwardButtonDown = false;
          break;
        case 'ArrowLeft':
          this.leftButtonDown = false;
          break;
        case 'ArrowRight':
          this.rightButtonDown = false;
          break;
      }
      this.updateRoverState();
    });
  }
}
