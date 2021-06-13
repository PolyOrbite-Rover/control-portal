import { Component, Input, OnInit } from '@angular/core';
import { InterestPoint } from 'src/app/interest-point/interest-point';

@Component({
  selector: 'app-interest-point-details',
  template: '',
})
export class InterestPointDetailsComponent {
  @Input('interest-point') interestPoint: InterestPoint;

  constructor() { }
}
