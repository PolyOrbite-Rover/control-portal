import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Topic } from 'roslib';
import { InterestPoint } from '../interest-point/interest-point';
import { InterestPointService } from '../interest-point/service/interest-point.service';
import { PhotographInterestPoint } from '../interest-point/type/photograph-interest-point';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.sass']
})
export class VideoStreamComponent implements AfterViewInit {
  private cameraTopicName: string;

  private originalFrameWidth: number = 640;
  private originalFrameHeight: number = 480;
  private lastContainerWidth: number;
  private lastContainerHeight: number;

  private firstPictureTaken: boolean = false;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild('frame') frame: ElementRef<HTMLImageElement>;

  @Input('message-type')
  messageType: string = 'sensor_msgs/CompressedImage';

  @Input('topic')
  set topic(name: string) {
    this.cameraTopicName = name;
  }

  get videoUrl(): string {
    return `http://jxnx:8080/stream?topic=${this.cameraTopicName}`;
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
    return false;
  }

  takePicture(): void {
    let image = this.frame.nativeElement;
    image.crossOrigin = 'Anonymous';

    if(this.firstPictureTaken) {
      this.publishPicture(image);
    }
    else {
      image.onload = () => {
        this.publishPicture(image);
        this.firstPictureTaken = true;
      }
    }
  }

  private publishPicture(image: HTMLImageElement): void {
    var canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    
    var dataURL = canvas.toDataURL("image/png");
    let base64Frame = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    
    this.interestPoints.add(new PhotographInterestPoint(base64Frame));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.lastContainerWidth = this.container.nativeElement.clientWidth;
      this.lastContainerHeight = this.container.nativeElement.clientHeight;
    });
  }

  constructor(private interestPoints: InterestPointService) { }
}
