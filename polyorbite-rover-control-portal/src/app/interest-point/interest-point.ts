import { InterestPointModel } from "./interest-point.model";
import { v4 as makeUuid } from 'uuid';

export abstract class InterestPoint {
  abstract get name(): string;
  abstract get model(): InterestPointModel;

  get uuid(): string {
    return this.mUuid;
  }

  get creationTimestamp(): Date {
    return this.mCreationTimestamp;
  }

  private mUuid: string;
  private mCreationTimestamp: Date;

  constructor() {
    this.mUuid = makeUuid();
    this.mCreationTimestamp = new Date();
  }
}
