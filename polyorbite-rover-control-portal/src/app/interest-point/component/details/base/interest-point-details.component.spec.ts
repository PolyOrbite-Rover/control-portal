import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestPointDetailsComponent } from './interest-point-details.component';

describe('InterestPointDetailsComponent', () => {
  let component: InterestPointDetailsComponent;
  let fixture: ComponentFixture<InterestPointDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestPointDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestPointDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
