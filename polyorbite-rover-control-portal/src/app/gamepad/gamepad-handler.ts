import { RoverControlProxyService } from "../rover-control-proxy/rover-control-proxy.service";
import { ArmControlProxyService } from "../arm-control-proxy/arm-control-proxy.service";
import { ControllerModeSwitchService } from "../controller-mode-switch/controller-mode-switch.service";

enum Mode {
  wheels,
  arm,
}

export class GamepadHandler {
  public mode: Mode;

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
    if (this.mode == Mode.wheels) {
      // controlling WHEELS with the gamepad
      this.controlProxy.linearVelocity = this.linearVelocity;
      this.controlProxy.angularVelocity = this.angularVelocity;
    } else {
      // controlling ROBOTIC ARM with the gamepad
      // this.armControlProxy.something = something...
    }
  }

  constructor(private id: number, private controlProxy: RoverControlProxyService, private armControlProxy: ArmControlProxyService, private switch: ControllerModeSwitchService) {
    this.switch.observableState$.subscribe((data) => {
      if (data == "wheels") {
        this.mode = Mode.wheels;
      } else {
        this.mode = Mode.arm;
      }
    });
    setInterval(() => this.handle(), 1000 / this.REFRESH_RATE);
  }
}
