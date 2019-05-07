import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapMarkerComponent } from './add-map-marker.component';

describe('AddMapMarkerComponent', () => {
  let component: AddMapMarkerComponent;
  let fixture: ComponentFixture<AddMapMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMapMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMapMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
