import { InterestPoint } from "../interest-point";
import { PhotographInterestPointModel } from "../model/photograph-interest-point.model";

export class PhotographInterestPoint extends InterestPoint {

  get model(): PhotographInterestPointModel {
    return new PhotographInterestPointModel(this.imageBase64, this.coordinates);
  }

  constructor(private imageBase64: string, private coordinates) {
    super();

    const creationTime = this.creationTimestamp.toLocaleTimeString();
    this.name = `Photograph - ${creationTime}`;
    this.coordinates = coordinates;
  }
}
