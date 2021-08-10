import { Component } from '@angular/core';
import { RoverControlProxyService } from '../rover-control-proxy/rover-control-proxy.service';
import { ArmControlProxyService } from '../arm-control-proxy/arm-control-proxy.service';

@Component({
  selector: 'app-rover-state',
  templateUrl: './rover-state.component.html',
  styleUrls: ['./rover-state.component.sass']
})
export class RoverStateComponent {

  ajustForProgressBarRover(rawValue: number): number {
    return (rawValue + 1) * 50;
  }

  ajustForProgressBarArm(rawValue: number): number {
    return (rawValue + 1) * 50;
  }

  constructor(public controlProxy: RoverControlProxyService, public armProxy: ArmControlProxyService) { }
}
