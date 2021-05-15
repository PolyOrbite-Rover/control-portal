import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { RoverControlProxyService } from '../rover-control-proxy/rover-control-proxy.service';
import { GamepadHandler } from './gamepad-handler';

@Injectable({
  providedIn: 'root'
})
export class GamepadService {
  private handlers: Map<string, GamepadHandler>;

  constructor(controlProxy: RoverControlProxyService) {
    this.handlers = new Map<string, GamepadHandler>();

    fromEvent(window, 'gamepadconnected').subscribe((event: GamepadEvent) => {
      const id = event.gamepad.id;
      const index = event.gamepad.index;
      this.handlers[id] = new GamepadHandler(index, controlProxy);
    });

    fromEvent(window, 'gamepaddisconnected').subscribe((event: GamepadEvent) => {
      this.handlers.delete(event.gamepad.id);
    });
  }
}
