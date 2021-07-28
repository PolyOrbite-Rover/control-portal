import { Injectable } from '@angular/core';
import { Ros, Topic, Service } from 'roslib';

@Injectable({
  providedIn: 'root'
})
export class ROSService {
  private ros: Ros;

  constructor() {
    this.ros = new Ros({url: 'ws://localhost:9090'});

    this.ros.on('error', () => {
      console.error('Could not connect to ROS');
    });
  }

  getTopic(name: string, messageType: string): Topic {
    return new Topic({ros: this.ros, name, messageType});
  }

  getService(name: string, serviceType: string): Service {
    return new Service({ros: this.ros, name, serviceType});
  }
}
