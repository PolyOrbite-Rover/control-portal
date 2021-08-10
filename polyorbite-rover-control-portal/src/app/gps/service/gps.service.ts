import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROSService } from 'src/app/ROS/ros.service';
import { WGS84Coordinates } from '../data/wgs84-coordinates';

@Injectable({
  providedIn: 'root'
})
export class GpsService {
  private readonly TOPIC_NAME = '/gps/fix';
  private readonly MESSAGE_TYPE = 'sensor_msgs/NavSatFix';

  constructor(private ros: ROSService) {
    this.currentCoordinates = { latitude: 0, longitude: 0 };
    let topic = ros.getTopic(this.TOPIC_NAME, this.MESSAGE_TYPE);
    topic.subscribe((message: WGS84Coordinates) => {
      this.currentCoordinates = {
        latitude: message.latitude,
        longitude: message.longitude
      };
      this.onFixUpdated.emit(this.currentCoordinates);
    });
  }

  public currentCoordinates: WGS84Coordinates;
  public onFixUpdated: EventEmitter<WGS84Coordinates> = new EventEmitter();
}
