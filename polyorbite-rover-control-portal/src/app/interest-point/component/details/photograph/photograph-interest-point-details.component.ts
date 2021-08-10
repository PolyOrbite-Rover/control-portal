import { Component, Input, OnInit } from '@angular/core';
import { InterestPoint } from 'src/app/interest-point/interest-point';
import { PhotographInterestPointModel } from 'src/app/interest-point/model/photograph-interest-point.model';
import { PhotographInterestPoint } from 'src/app/interest-point/type/photograph-interest-point';
import { InterestPointDetailsComponent } from '../base/interest-point-details.component';

@Component({
  selector: 'app-photograph-interest-point-details',
  templateUrl: './photograph-interest-point-details.component.html',
  styleUrls: ['./photograph-interest-point-details.component.sass']
})
export class PhotographInterestPointDetailsComponent extends InterestPointDetailsComponent {

  get photographBase64(): string {
    const header = 'data:image/png;base64';
    const data = (this.interestPoint as PhotographInterestPoint).model.imageBase64;
    return `${header},${data}`;
  }

  get coordinates(): string {
    let coordinatesData = (this.interestPoint as PhotographInterestPoint).model.coordinates;
    return `[${coordinatesData.latitude}, ${coordinatesData.longitude}]`;
  }

  constructor() {
    super();
  }
}
