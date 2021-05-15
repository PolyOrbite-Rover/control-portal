import { RoverControlProxyService } from "../rover-control-proxy/rover-control-proxy.service";

export class GamepadHandler {
  readonly REFRESH_RATE: number = 10;

  readonly DIRECTION_AXIS = 0;
  readonly ACCELERATOR_BUTTON = 7;
  readonly DECELERATOR_BUTTON = 6;

  get accelerator(): number {
    return this.gamepad.buttons[this.ACCELERATOR_BUTTON].value;
  }

  get decelerator(): number {
    return this.gamepad.buttons[this.DECELERATOR_BUTTON].value;
  }

  get linearVelocity(): number {
    return this.accelerator - this.decelerator;
  }

  get angularVelocity(): number {
    return this.gamepad.axes[this.DIRECTION_AXIS];
  }

  get gamepad(): Gamepad {
    return navigator.getGamepads()[this.id];
  }

  private handle(): void {
    this.controlProxy.linearVelocity = this.linearVelocity;
    this.controlProxy.angularVelocity = this.angularVelocity;
  }

  constructor(private id: number, private controlProxy: RoverControlProxyService) {
    setInterval(() => this.handle(), 1000 / this.REFRESH_RATE);
  }
}
