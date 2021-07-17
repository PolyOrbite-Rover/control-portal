import { ArucoLandmark } from 'src/app/landmark/type/aruco-landmark';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  add(interestPoint: ArucoLandmark): void {
    this.landmarks.push(interestPoint);
  }

  search(value: number): boolean {
    for (var l of this.landmarks) {
      if (l.getValue() == value) {
        return true;
      }
    }
    return false;
  }

  clear(): void {
    this.landmarks = [];
  }

  get entries(): Array<ArucoLandmark> {
    return this.landmarks;
  }

  private landmarks: Array<ArucoLandmark> = [];
}
