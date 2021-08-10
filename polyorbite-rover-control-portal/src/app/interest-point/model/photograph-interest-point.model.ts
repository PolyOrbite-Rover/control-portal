import { WGS84Coordinates } from "src/app/gps/data/wgs84-coordinates";
import { InterestPointModel } from "../interest-point.model";

export class PhotographInterestPointModel extends InterestPointModel {
  constructor(public imageBase64: string, public coordinates: WGS84Coordinates) {
    super();
  }
}
