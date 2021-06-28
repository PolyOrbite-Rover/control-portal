import { InterestPointModel } from "../interest-point.model";

export class PhotographInterestPointModel extends InterestPointModel {
  constructor(public imageBase64: string) {
    super();
  }

  public get data(): String {
    return this.imageBase64;
  }
}
