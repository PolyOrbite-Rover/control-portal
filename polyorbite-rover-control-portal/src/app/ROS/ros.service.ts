import { Injectable } from '@angular/core';
import { Ros, Topic } from 'roslib';

@Injectable({
  providedIn: 'root'
})
export class ROSService {
  private ros: Ros;

  constructor() {
    this.ros = new Ros({url: 'ws://192.168.3.11:9090'});

    this.ros.on('error', () => {
      console.error('Could not connect to ROS');
    });
  }

  getTopic(name: string, messageType: string): Topic {
    return new Topic({ros: this.ros, name, messageType});
  }
}
