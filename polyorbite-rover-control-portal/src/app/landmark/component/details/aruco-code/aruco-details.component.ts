import { Component } from '@angular/core';
import { ArucoLandmark } from 'src/app/landmark/type/aruco-landmark';
import { InterestPointDetailsComponent } from '../../../../interest-point/component/details/base/interest-point-details.component';

@Component({
  selector: 'app-aruco-details',
  templateUrl: './aruco-details.component.html',
  styleUrls: ['./aruco-details.component.sass']
})
export class ArucoLandmarkDetailsComponent extends InterestPointDetailsComponent {

  get photographBase64(): string {
    const header = 'data:image/png;base64';
    const data = (this.interestPoint as ArucoLandmark).model.imageBase64;
    return `${header},${data}`;
  }

  constructor() {
    super();
  }
}
