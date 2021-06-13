import { Injectable } from '@angular/core';
import { InterestPoint } from '../interest-point';

@Injectable({
  providedIn: 'root'
})
export class InterestPointService {
  add(interestPoint: InterestPoint): void {
    this.interestPoints.push(interestPoint);
  }

  clear(): void {
    this.interestPoints = [];
  }

  get entries(): Array<InterestPoint> {
    return this.interestPoints;
  }

  private interestPoints: Array<InterestPoint> = [];
}
