import { Component, Input } from '@angular/core';
import { Topic } from 'roslib';
import { ArucoLandmark } from 'src/app/landmark/type/aruco-landmark';
import { LandmarkService } from '../landmark/service/landmark.service';
import { ROSService } from '../ROS/ros.service';
import { ArucoMsgData } from '../landmark/component/list/aruco-msg-data';

@Component({
  selector: 'app-aruco-mode-switch',
  styleUrls: ['./aruco.component.sass'],
  templateUrl: './aruco.component.html',
})
export class ArucoModeSwitchComponent {
  @Input('state')
  public checked: boolean;

  private arucoTopic: Topic | undefined;
  public messageType = 'polyorbite_rover/Code';

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
    this.arucoTopic?.unsubscribe();
    this.arucoTopic = this.ros.getTopic(name, this.messageType);
    this.arucoTopic?.subscribe((message: any) => this.addFoundAruco(message.data));
  }

  public addFoundAruco(data: ArucoMsgData): void {
    if (!this.landmarks.search(data.value)) {
      this.landmarks.add(
        new ArucoLandmark(data.image, data.value, 0),
      );
    }
  }

  constructor(
    private ros: ROSService,
    private landmarks: LandmarkService,
  ) {
    this.checked = true;
  }
}
