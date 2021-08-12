import { RoverControlProxyService } from "../rover-control-proxy/rover-control-proxy.service";
import { ArmControlProxyService } from "../arm-control-proxy/arm-control-proxy.service";
import { ControllerModeSwitchService } from "../controller-mode-switch/controller-mode-switch.service";

enum Mode {
  wheels,
  arm,
}

export class GamepadHandler {
  public mode: Mode = Mode.wheels;

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

  get arm0(): number {
    return this.gamepad.axes[0];
  }

  get arm1(): number {
    return this.gamepad.axes[1];
  }

  get arm2(): number {
    return this.gamepad.axes[4];
  }

  get arm3(): number {
    return this.gamepad.buttons[5].value - this.gamepad.buttons[4].value;
  }

  get arm4(): number {
    return this.gamepad.axes[7];
  }

  get arm5(): number {
    return this.gamepad.axes[6];
  }

  /*
  get armForward(): number {
    return;
  }

  get armBackward(): number {
    return;
  }

  get armUp(): number {
    return;
  }

  get armDown(): number {
    return;
  }

  get armTool(): number {
    return;
  }
  */

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
      this.armControlProxy.zero = this.arm0;
      this.armControlProxy.one = this.arm1;
      this.armControlProxy.two = this.arm2;
      this.armControlProxy.three = this.arm3;
      this.armControlProxy.four = this.arm4;
      this.armControlProxy.five = this.arm5;
    }
  }

  constructor(
    private id: number,
    private controlProxy: RoverControlProxyService,
    private armControlProxy: ArmControlProxyService,
    private switchService: ControllerModeSwitchService,
    ) {
    this.switchService.observableState.subscribe(state => {
      if (state == "wheels") {
        this.mode = Mode.wheels;
      } else {
        this.mode = Mode.arm;
      }
    });
    setInterval(() => this.handle(), 1000 / this.REFRESH_RATE);
  }
}
