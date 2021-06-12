import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographInterestPointDetailsComponent } from './photograph-interest-point-details.component';

describe('PhotographInterestPointDetailsComponent', () => {
  let component: PhotographInterestPointDetailsComponent;
  let fixture: ComponentFixture<PhotographInterestPointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotographInterestPointDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographInterestPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
