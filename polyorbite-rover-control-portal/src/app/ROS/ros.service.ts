import { Injectable } from '@angular/core';
import { Ros, Topic } from 'roslib';

@Injectable({
  providedIn: 'root'
})
export class ROSService {
  private ros: Ros;

  constructor() {
    this.ros = new Ros({url: 'ws://127.0.0.1:9090'});
  }

  getTopic(name: string, messageType: string): Topic {
    return new Topic({ros: this.ros, name, messageType});
  }
}
