import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'roslib';
import { ROSService } from '../ROS/ros.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.sass']
})
export class VideoStreamComponent {
  private m_cameraTopic: Topic | undefined;

  @Input('width') width: string | undefined;
  @Input('height') height: string | undefined;

  @Input('message-type')
  messageType: string = 'sensor_msgs/CompressedImage';

  @Input('topic')
  set topic(name: string) {
    this.updateTopic(name);
  }

  @ViewChild('frame', { static: false }) frame: ElementRef<HTMLCanvasElement>;

  private updateTopic(name: string): void {
    this.m_cameraTopic?.unsubscribe();
    this.m_cameraTopic = this.ros.getTopic(name, this.messageType);
    this.m_cameraTopic?.subscribe((message: any) => this.refreshImage(message.data));
  }

  private refreshImage(imageBase64: string) {
    const ctx = this.frame.nativeElement.getContext('2d');

    const image = new Image();
    image.onload = () => {
      const newWidth = this.width === undefined ? image.width : parseInt(this.width);
      const newHeight = this.height === undefined ? image.height : parseInt(this.height);
      this.frame.nativeElement.width = newWidth;
      this.frame.nativeElement.height = newHeight;
      ctx.drawImage(image, 0, 0, newWidth, newHeight);
    };

    image.src = `data:image/png;base64,${imageBase64}`;
  }

  constructor(private ros: ROSService) {}
}
