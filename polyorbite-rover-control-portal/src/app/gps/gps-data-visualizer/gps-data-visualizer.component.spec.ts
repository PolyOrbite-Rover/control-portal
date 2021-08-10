import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsDataVisualizerComponent } from './gps-data-visualizer.component';

describe('GpsDataVisualizerComponent', () => {
  let component: GpsDataVisualizerComponent;
  let fixture: ComponentFixture<GpsDataVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GpsDataVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GpsDataVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
