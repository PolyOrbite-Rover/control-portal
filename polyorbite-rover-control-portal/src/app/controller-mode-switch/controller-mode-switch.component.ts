import { Component } from '@angular/core';
import { ControllerModeSwitchService } from './controller-mode-switch.service';


@Component({
  selector: 'app-controller-mode-switch',
  templateUrl: './controller-mode-switch.component.html',
  styleUrls: ['./controller-mode-switch.component.sass']
})
export class ControllerModeSwitchComponent {
  mode: string = "wheels";

  constructor(private service: ControllerModeSwitchService) {
    this.service.observableState(this.mode);
  }
}
