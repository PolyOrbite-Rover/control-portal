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
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Point from 'ol/geom/Point';
import { WGS84Coordinates } from '../gps/data/wgs84-coordinates';

const proj4 = (proj4Import as any).default;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements AfterViewInit {
  private readonly PROJECTION_NAME = "EPSG:4326";
  private readonly PROJECTION_DEFINITION_ARGS =
    "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
  private readonly PROJECTION_EXTENT: Extent = [
    -20026376.39,
    -20048966.10,
     20026376.39,
     20048966.10
  ];

  private readonly MIN_CONTAINER_HEIGHT = 400;

  private containerWidth: number;
  private containerHeight: number;

  private roverPositionMarker: Feature;

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

    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      projection: this.projection
    });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM({})
        }),
        new TileLayer({
          source: new XYZ({
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            maxZoom: 19
          })
        })
      ],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({})
      ])
    });
    this.makeRoverMarker({ latitude: 0, longitude: 0});

    this.view.centerOn([0, 0], toSize(this.zoom), [0, 0]);
  }

  private makeRoverMarker(coordinates: WGS84Coordinates) {
    let roverSource = new VectorSource({});
    let roverLayer = new VectorLayer({
      source: roverSource
    });
    this.map.addLayer(roverLayer);
    
    this.roverPositionMarker = new Feature({
      geometry: new Point([coordinates.longitude, coordinates.latitude])
    });

    roverSource.addFeature(this.roverPositionMarker);
  }

  ngAfterViewInit(): void {
    if(!this.map) this.zone.runOutsideAngular(() => this.initializeMap());

    this.gps.onFixUpdated.subscribe(coordinates => {
      if(this.autoCenter) {
        this.center = [coordinates.longitude, coordinates.latitude];
        this.view.centerOn(this.center, toSize(this.zoom), [0, 0]);
        this.roverPositionMarker.setGeometry(new Point([coordinates.longitude, coordinates.latitude]));
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
