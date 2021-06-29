import { Injectable } from '@angular/core';
import { Message, Topic } from 'roslib';
import { ROSService } from 'src/app/ROS/ros.service';
import { InterestPoint } from '../interest-point';

@Injectable({
  providedIn: 'root'
})
export class InterestPointService {
  add(interestPoint: InterestPoint): void {
    this.interestPoints.push(interestPoint);

    interestPoint.onContentChanged.subscribe(
      interestPoint => this.updateInterestPoint(interestPoint)
    );
    this.persistInterestPoint(interestPoint);
  }

  clear(): void {
    this.interestPoints = [];
  }

  private persistInterestPoint(interestPoint: InterestPoint): void {
    const message = new Message({
      uuid: interestPoint.uuid,
      creationTimestamp: interestPoint.creationTimestamp,
      name: interestPoint.name,
      data: interestPoint.model.data
    });

    this.interestPointAddPublisher.publish(message);
  }

  private updateInterestPoint(interestPoint: InterestPoint): void {
    const message = new Message({
      uuid: interestPoint.uuid,
      creationTimestamp: interestPoint.creationTimestamp,
      name: interestPoint.name,
      data: interestPoint.model.data
    });

    this.interestPointUpdatePublisher.publish(message);
  }

  get entries(): Array<InterestPoint> {
    return this.interestPoints;
  }

  private interestPoints: Array<InterestPoint> = [];
  private interestPointAddPublisher: Topic;
  private interestPointUpdatePublisher: Topic;

  constructor(private ros: ROSService) {
    this.interestPointAddPublisher = ros.getTopic('interest_points/add', 'interest_points/InterestPoint');
    this.interestPointUpdatePublisher = ros.getTopic('interest_points/update', 'interest_points/InterestPoint');
  }
}
