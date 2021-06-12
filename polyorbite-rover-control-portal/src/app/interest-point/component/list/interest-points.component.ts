import { Component, OnInit } from '@angular/core';
import { InterestPointService } from '../../service/interest-point.service';

@Component({
  selector: 'app-interest-points',
  templateUrl: './interest-points.component.html',
  styleUrls: ['./interest-points.component.sass']
})
export class InterestPointsComponent {
  selectedId: string;

  constructor(public interestPoints: InterestPointService) {
    if(this.interestPoints.entries.length > 0) {
      this.selectedId = this.interestPoints.entries[0].uuid;
    }
  }
}
