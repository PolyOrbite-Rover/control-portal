import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPointsComponent } from './interest-points.component';

describe('InterestPointsComponent', () => {
  let component: InterestPointsComponent;
  let fixture: ComponentFixture<InterestPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
