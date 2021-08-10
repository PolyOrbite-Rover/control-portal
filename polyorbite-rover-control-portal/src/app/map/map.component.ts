import {Component, NgZone, AfterViewInit, Output, Input, EventEmitter, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import {View, Feature, Map } from 'ol';
import {Coordinate} from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import * as proj4Import from 'proj4';
import VectorLayer from 'ol/layer/Vector';
import Projection from 'ol/proj/Projection';
import {register}  from 'ol/proj/proj4';
import {get as GetProjection} from 'ol/proj'
import {Extent} from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import OSM, {ATTRIBUTION} from 'ol/source/OSM';
import { GpsService } from '../gps/service/gps.service';
import { toSize } from 'ol/size';

const proj4 = (proj4Import as any).default;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {
  private readonly PROJECTION_NAME = "EPSG:3857";
  private readonly PROJECTION_DEFINITION_ARGS =
    "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs";
  private readonly PROJECTION_EXTENT: Extent = [
    -20026376.39,
    -20048966.10,
     20026376.39,
     20048966.10
  ];

  private readonly MIN_CONTAINER_HEIGHT = 320;

  private containerWidth: number;
  private containerHeight: number;

  autoCenter: boolean = true;

  view: View;
  projection: Projection;
  map: Map;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  @Input() center: Coordinate;
  @Input() zoom: number = 4;

  get width(): number {
    return this.containerWidth;
  }

  get height(): number {
    if(isNaN(this.containerHeight)) this.containerHeight = 0;
    return Math.max(this.containerHeight, this.MIN_CONTAINER_HEIGHT);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.containerWidth = this.container.nativeElement.clientWidth;
    this.containerHeight = this.container.nativeElement.clientHeight;
  }

  private initializeMap(): void {
    proj4.defs(this.PROJECTION_NAME, this.PROJECTION_DEFINITION_ARGS);
    register(proj4);
    this.projection = GetProjection(this.PROJECTION_NAME);
    this.projection.setExtent(this.PROJECTION_EXTENT);

    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: 'EPSG:4326'
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM({})
        })
      ],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({})
      ])
    });
  }

  ngAfterViewInit(): void {
    if(!this.map) this.zone.runOutsideAngular(() => this.initializeMap());

    this.gps.onFixUpdated.subscribe(coordinates => {
      if(this.autoCenter) {
        this.center = [coordinates.longitude, coordinates.latitude];
        this.view.centerOn(this.center, toSize(this.zoom), [0, 0]);
      }
    });

    setTimeout(() => {
      this.containerWidth = this.container.nativeElement.clientWidth;
      this.containerHeight = this.container.nativeElement.clientHeight;
    }, 1000);
  }

  constructor(
    private zone: NgZone,
    private changeDetector: ChangeDetectorRef,
    private gps: GpsService
  ) {}
}
