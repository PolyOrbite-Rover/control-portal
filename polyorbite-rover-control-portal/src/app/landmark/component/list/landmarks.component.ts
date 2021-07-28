import { Component, ElementRef, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren, Input } from '@angular/core';
import { EditableTextComponent } from 'src/app/editable-text/editable-text.component';
import { LandmarkService } from '../../service/landmark.service';
import { Topic } from 'roslib';
import { ArucoLandmark } from 'src/app/landmark/type/aruco-landmark';
import { ROSService } from '../../../ROS/ros.service';
import { ArucoMsgData } from './aruco-msg-data';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.sass']
})
export class LandmarksComponent {
  selectedId: string;

  private arucoTopic: Topic | undefined;
  public messageType = 'polyorbite_rover/Code';

  @ViewChildren('landmarkNameEditors') landmarkNameEditors: QueryList<EditableTextComponent>;

  select(uuid: string): void {
    if(uuid !== this.selectedId) {
      this.stopEditing();
      this.selectedId = uuid;
    }
  }

  stopEditing(): void {
    this.landmarkNameEditors.forEach(
      editor => editor.isEditing = false
    );
  }

  public addFoundAruco(data: ArucoMsgData): void {
    if (!this.landmarks.search(data.value)) {
      this.landmarks.add(
        new ArucoLandmark(data.image, data.value, 0),
      );
    }
  }

  constructor(
    private ros: ROSService,
    public landmarks: LandmarkService,
  ) {
    if(this.landmarks.entries.length > 0) {
      this.selectedId = this.landmarks.entries[0].uuid;
    }
    this.arucoTopic = this.ros.getTopic("/aruco", this.messageType);
    this.arucoTopic?.subscribe((message: any) => this.addFoundAruco(message.data));
  }
}
