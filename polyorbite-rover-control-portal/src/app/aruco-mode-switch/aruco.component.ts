import { ArucoLandmark } from 'src/app/landmark/type/aruco-landmark';
import {Component, AfterViewInit, Input } from '@angular/core';
import { Topic } from 'roslib';
import { LandmarkService } from '../landmark/service/landmark.service';
import { ROSService } from '../ROS/ros.service';
import { ArucoMsgData } from './aruco-msg-data';

@Component({
  selector: 'app-aruco-mode-switch',
  templateUrl: './aruco.component.html',
  styleUrls: ['./aruco.component.sass']
})
export class ArucoModeSwitchComponent implements AfterViewInit {
  @Input('state')
  checked: boolean;

  private m_arucoTopic: Topic | undefined;
  messageType: string = 'polyorbite_rover/Code';

  /*
   * On the Jetson :
   * The rover looks for Aruco and QR codes all the time. When he
   * finds one, it is sent to the ground station. If not,
   * there is no data being sent on the "codes" topic.
   */

  @Input('topic')
  set topic(name: string) {
    this.updateTopic(name);
  }

  private updateTopic(name: string): void {
    this.m_arucoTopic?.unsubscribe();
    this.m_arucoTopic = this.ros.getTopic(name, this.messageType);
    this.m_arucoTopic?.subscribe((message: any) => this.addFoundAruco(message.data));
  }

  addFoundAruco(data: ArucoMsgData): void {
    if (!this.landmarks.search(data.value)) {
      this.landmarks.add(
        new ArucoLandmark(data.image, data.value, 0)
      );
    }
  }

  constructor(
    private ros: ROSService,
    private landmarks: LandmarkService
  ) {
    this.checked = true;
  }
}
