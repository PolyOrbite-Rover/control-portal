import { InterestPoint } from "../../interest-point/interest-point";
import { ArucoLandmarkModel } from "../model/aruco-landmark.model";

export class ArucoLandmark extends InterestPoint {

  get model(): ArucoLandmarkModel {
    return new ArucoLandmarkModel(this.imageBase64, this.value, this.distance);
  }

  updateDistance(newDist: number) {
    this.distance = newDist;
    this.name = `Aruco Code #`+this.value+` found - dist: `+this.distance;
  }

  getValue() {
    return this.value;
  }

  constructor(private imageBase64: string, private value: number, private distance: number) {
    super();

    const creationTime = this.creationTimestamp.toLocaleTimeString();
    this.name = `Aruco Code #`+this.value+` found - dist: `+this.distance;
  }
}
