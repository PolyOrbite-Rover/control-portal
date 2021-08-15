import { Injectable } from '@angular/core';
import { Message, Topic } from 'roslib';
import { ROSService } from '../ROS/ros.service';

@Injectable({
  providedIn: 'root'
})
export class RoverControlProxyService {
  private readonly DIFF_DRIVE_VELOCITY_TOPIC_NAME = '/rover_velocity_controller/cmd_vel';
  private readonly DIFF_DRIVE_VELOCITY_MESSAGE_TYPE = 'geometry_msgs/Twist';

  private readonly SHOVEL_VELOCITY_TOPIC_NAME = '/shovel_cmds';
  private readonly SHOVEL_VELOCITY_MESSAGE_TYPE = '/std_msgs/Float32';

  private readonly LINEAR_VELOCITY_COEFFICIENT = 3;
  private readonly ANGULAR_VELOCITY_COEFFICIENT = 3;

  private diffDriveVelocityTopic: Topic;
  private shovelVelocityTopic: Topic;

  private linearVelocityCache: number;
  private angularVelocityCache: number;
  private shovelVelocityCache: number;

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

  get shovelVelocity(): number { return this.shovelVelocityCache }
  set shovelVelocity(velocity: number) {
    this.shovelVelocityCache = velocity;
    this.publishShovelVelocity();
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

  private publishShovelVelocity(): void {
    const message = new Message({
      data: this.shovelVelocity
    });
    this.shovelVelocityTopic.publish(message);
  }

  constructor(ros: ROSService) {
    this.linearVelocityCache = 0;
    this.angularVelocityCache = 0;
    this.shovelVelocityCache = 0;

    this.diffDriveVelocityTopic = ros.getTopic(
      this.DIFF_DRIVE_VELOCITY_TOPIC_NAME,
      this.DIFF_DRIVE_VELOCITY_MESSAGE_TYPE,
    );
    this.shovelVelocityTopic = ros.getTopic(
      this.SHOVEL_VELOCITY_TOPIC_NAME,
      this.SHOVEL_VELOCITY_MESSAGE_TYPE,
    )
  }
}
