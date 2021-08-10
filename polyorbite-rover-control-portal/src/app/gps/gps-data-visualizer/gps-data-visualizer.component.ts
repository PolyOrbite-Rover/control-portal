import { Component, OnInit } from '@angular/core';
import { GpsService } from '../service/gps.service';

@Component({
  selector: 'app-gps-data-visualizer',
  templateUrl: './gps-data-visualizer.component.html',
  styleUrls: ['./gps-data-visualizer.component.sass']
})
export class GpsDataVisualizerComponent {

  constructor(public gps: GpsService) { }
}
