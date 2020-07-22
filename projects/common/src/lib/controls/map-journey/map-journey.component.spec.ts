import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapJourneyComponent } from './map-journey.component';

describe('MapJourneyComponent', () => {
  let component: MapJourneyComponent;
  let fixture: ComponentFixture<MapJourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapJourneyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapJourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
