import { Component } from '@angular/core';

@Component({
  selector: 'app-video-stream-switch',
  templateUrl: './video-stream-switch.component.html',
  styleUrls: ['./video-stream-switch.component.sass']
})
export class VideoStreamSwitchComponent {
  currentTopic: string = "/front_camera/image_raw";

  constructor() { }
}
