import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'roslib';
import { ROSService } from '../ROS/ros.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.sass']
})
export class VideoStreamComponent implements AfterViewInit {
  private m_cameraTopic: Topic | undefined;

  private originalFrameWidth: number;
  private originalFrameHeight: number;
  private lastContainerWidth: number;
  private lastContainerHeight: number;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild('frame') frame: ElementRef<HTMLCanvasElement>;

  @Input('message-type')
  messageType: string = 'sensor_msgs/CompressedImage';

  @Input('topic')
  set topic(name: string) {
    this.updateTopic(name);
  }

  get frameWidth(): number {
    if(this.lastContainerHeight === 0) return this.originalFrameWidth;

    const ajustedWidth = (this.originalFrameWidth / this.originalFrameHeight) * this.lastContainerWidth;
    const isLargestComponent = this.lastContainerWidth >= this.lastContainerHeight;

    return isLargestComponent ? this.lastContainerWidth : ajustedWidth;
  }

  get frameHeight(): number {
    if(this.lastContainerWidth === 0) return this.originalFrameHeight;

    const ajustedHeight = (this.originalFrameHeight / this.originalFrameWidth) * this.lastContainerWidth;
    const isLargestComponent = this.lastContainerHeight >= this.lastContainerWidth;

    return isLargestComponent ? this.lastContainerHeight : ajustedHeight;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.lastContainerWidth = this.container.nativeElement.clientWidth;
    this.lastContainerHeight = this.container.nativeElement.clientHeight;
  }

  get isLoading(): boolean {
    return this.m_cameraTopic === undefined;
  }

  private updateTopic(name: string): void {
    this.m_cameraTopic?.unsubscribe();
    this.m_cameraTopic = this.ros.getTopic(name, this.messageType);
    this.m_cameraTopic?.subscribe((message: any) => this.refreshImage(message.data));
  }

  private refreshImage(imageBase64: string) {
    const ctx = this.frame.nativeElement.getContext('2d');

    const image = new Image();
    image.onload = () => {
      this.originalFrameWidth = image.width;
      this.originalFrameHeight = image.height;
      ctx.drawImage(image, 0, 0, this.frameWidth, this.frameHeight);
    };

    image.src = `data:image/png;base64,${imageBase64}`;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lastContainerWidth = this.container.nativeElement.clientWidth;
      this.lastContainerHeight = this.container.nativeElement.clientHeight;
    });
  }

  constructor(private ros: ROSService) {}
}
