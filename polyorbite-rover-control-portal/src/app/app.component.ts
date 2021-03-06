import { Component } from '@angular/core';
import { GamepadService } from './gamepad/gamepad.service';
import { GpsService } from './gps/service/gps.service';
import { KeyboardService } from './keyboard/keyboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(
    gamepad: GamepadService,
    keyboard: KeyboardService,
    public gps: GpsService
  ) {}
}
