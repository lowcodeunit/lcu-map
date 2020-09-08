import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLocationWindowComponent } from './activity-location-window.component';

describe('ActivityLocationWindowComponent', () => {
  let component: ActivityLocationWindowComponent;
  let fixture: ComponentFixture<ActivityLocationWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityLocationWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLocationWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
