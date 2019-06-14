import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationInfoFormComponent } from './location-info-form.component';

describe('LocationInfoFormComponent', () => {
  let component: LocationInfoFormComponent;
  let fixture: ComponentFixture<LocationInfoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationInfoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
