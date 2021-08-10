import { Injectable } from '@angular/core';
import { Message, Topic } from 'roslib';
import { ROSService } from '../ROS/ros.service';

@Injectable({
  providedIn: 'root'
})
export class ArmControlProxyService {
  private readonly ROBOTIC_ARM_TOPIC_NAME = '/sixi_commands';
  private readonly ROBOTIC_ARM_MESSAGE_TYPE = 'sixi_robot/CmdWeb';

  private armTopic: Topic;

  private zeroCache: number;
  private oneCache: number;
  private twoCache: number;
  private threeCache: number;
  private fourCache: number;
  private fiveCache: number;

  get zero(): number { return this.zeroCache; }
  set zero(newValue: number) {
    this.zeroCache = newValue;
    this.publish();
  }

  get one(): number { return this.oneCache; }
  set one(newValue: number) {
    this.oneCache = newValue;
    this.publish();
  }

  get two(): number { return this.twoCache; }
  set two(newValue: number) {
    this.twoCache = newValue;
    this.publish();
  }

  get three(): number { return this.threeCache; }
  set three(newValue: number) {
    this.threeCache = newValue;
    this.publish();
  }

  get four(): number { return this.fourCache; }
  set four(newValue: number) {
    this.fourCache = newValue;
    this.publish();
  }

  get five(): number { return this.fiveCache; }
  set five(newValue: number) {
    this.fiveCache = newValue;
    this.publish();
  }

  /*
  private forwardCache: number;
  private backwardCache: number;
  private upCache: number;
  private downCache: number;
  private toolCache: number;

  get forward(): number { return this.forwardCache; }
  set forward(newValue: number) {
    this.forwardCache = newValue;
    this.publish();
  }

  get backward(): number { return this.backwardCache; }
  set backward(newValue: number) {
    this.backwardCache = newValue;
    this.publish();
  }

  get up(): number { return this.upCache; }
  set up(newValue: number) {
    this.upCache = newValue;
    this.publish();
  }

  get down(): number { return this.downCache; }
  set down(newValue: number) {
    this.downCache = newValue;
    this.publish();
  }

  get tool(): number { return this.toolCache; }
  set tool(newValue: number) {
    this.toolCache = newValue;
    this.publish();
  }
  */

  private publish(): void {

    const cmd = new Message({
      zero: this.zeroCache,
      one: this.oneCache,
      two: this.twoCache,
      three: this.threeCache,
      four: this.fourCache,
      five: this.fiveCache
    });
    this.armTopic.publish(cmd);
  }

  constructor(ros: ROSService) {
    this.zeroCache = 0;
    this.oneCache = 0;
    this.twoCache = 0;
    this.threeCache = 0;
    this.fourCache = 0;
    this.fiveCache = 0;

    this.armTopic = ros.getTopic(
      this.ROBOTIC_ARM_TOPIC_NAME,
      this.ROBOTIC_ARM_MESSAGE_TYPE,
    );
  }
}
