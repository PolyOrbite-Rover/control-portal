import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverStateComponent } from './rover-state.component';

describe('RoverStateComponent', () => {
  let component: RoverStateComponent;
  let fixture: ComponentFixture<RoverStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoverStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
