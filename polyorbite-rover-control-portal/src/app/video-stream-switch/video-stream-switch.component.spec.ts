import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoStreamSwitchComponent } from './video-stream-switch.component';

describe('VideoStreamSwitchComponent', () => {
  let component: VideoStreamSwitchComponent;
  let fixture: ComponentFixture<VideoStreamSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoStreamSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoStreamSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
