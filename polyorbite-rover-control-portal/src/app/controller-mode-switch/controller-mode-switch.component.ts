import { Component } from '@angular/core';


@Component({
  selector: 'app-controller-mode-switch',
  templateUrl: './controller-mode-switch.component.html',
  styleUrls: ['./controller-mode-switch.component.sass']
})
export class ControllerModeSwitchComponent {
  mode: string = "wheels";

  constructor() { }
}
