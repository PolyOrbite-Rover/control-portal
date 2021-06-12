import { InterestPoint } from "../interest-point";
import { PhotographInterestPointModel } from "../model/photograph-interest-point.model";

export class PhotographInterestPoint extends InterestPoint {
  get name(): string {
    return this.mName;
  }

  get model(): PhotographInterestPointModel {
    return new PhotographInterestPointModel(this.imageBase64);
  }

  private mName: string;

  private initializeName(): void {
    const creationTime = this.creationTimestamp.toLocaleTimeString();
    this.mName = `Photograph - ${creationTime}`;
  }

  constructor(private imageBase64: string) {
    super();
    this.initializeName();
  }
}
