import { InterestPointModel } from "./interest-point.model";
import { v4 as makeUuid } from 'uuid';
import { EventEmitter } from "@angular/core";

export abstract class InterestPoint {
  set name(name: string) {
    this.mName = name;
    this.advertiseContentChanged();
  }

  get name(): string {
    return this.mName;
  }

  abstract get model(): InterestPointModel;

  get uuid(): string {
    return this.mUuid;
  }

  get creationTimestamp(): Date {
    return this.mCreationTimestamp;
  }

  onContentChanged: EventEmitter<InterestPoint>;

  private mName: string;
  private mUuid: string;
  private mCreationTimestamp: Date;

  private advertiseContentChanged(): void {
    this.onContentChanged.emit(this);
  }

  constructor(name?: string, uuid?: string, creationTimestamp?: Date) {
    if(name != undefined) this.mName = name;
    this.mUuid = uuid ?? makeUuid();
    this.mCreationTimestamp = creationTimestamp ?? new Date();
    this.onContentChanged = new EventEmitter();
  }
}
