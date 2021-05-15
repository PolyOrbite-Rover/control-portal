import { Injectable } from '@angular/core';
import { Message, Topic } from 'roslib';
import { ROSService } from '../ROS/ros.service';

@Injectable({
  providedIn: 'root'
})
export class RoverControlProxyService {
  private readonly DIFF_DRIVE_VELOCITY_TOPIC_NAME = '/rover_diff_drive_controller/cmd_vel';
  private readonly DIFF_DRIVE_VELOCITY_MESSAGE_TYPE = 'geometry_msgs/Twist';

  private readonly LINEAR_VELOCITY_COEFFICIENT = 3;
  private readonly ANGULAR_VELOCITY_COEFFICIENT = 3;

  private diffDriveVelocityTopic: Topic;

  private linearVelocityCache: number;
  private angularVelocityCache: number;

  get linearVelocity(): number { return this.linearVelocityCache; }
  set linearVelocity(velocity: number) {
    this.linearVelocityCache = velocity;
    this.publishVelocityTwist();
  }

  get angularVelocity(): number { return this.angularVelocityCache; }
  set angularVelocity(velocity: number) {
    this.angularVelocityCache = velocity;
    this.publishVelocityTwist();
  }

  private publishVelocityTwist(): void {
    const linearVelocity = this.linearVelocityCache;
    const shouldInvertDirection = linearVelocity >= 0;
    const angularVelocity = shouldInvertDirection ? -this.angularVelocityCache
                                                  :  this.angularVelocityCache;

    const twist = new Message({
      linear: {
        x: linearVelocity * this.LINEAR_VELOCITY_COEFFICIENT,
        y: 0,
        z: 0
      },
      angular: {
        x: 0,
        y: 0,
        z: angularVelocity * this.ANGULAR_VELOCITY_COEFFICIENT
      },
    });
    this.diffDriveVelocityTopic.publish(twist);
  }

  constructor(ros: ROSService) {
    this.linearVelocityCache = 0;
    this.angularVelocityCache = 0;

    this.diffDriveVelocityTopic = ros.getTopic(
      this.DIFF_DRIVE_VELOCITY_TOPIC_NAME,
      this.DIFF_DRIVE_VELOCITY_MESSAGE_TYPE,
    );
  }
}
