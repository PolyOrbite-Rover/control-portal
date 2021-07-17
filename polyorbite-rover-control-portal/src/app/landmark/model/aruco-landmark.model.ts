import { InterestPointModel } from "../../interest-point/interest-point.model";

export class ArucoLandmarkModel extends InterestPointModel {
  constructor(public imageBase64: string, public value: number, public distance: number) {
    super();
  }
}
