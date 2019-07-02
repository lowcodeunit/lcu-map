import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcuMapComponent } from './lcu-map.component';

describe('LcuMapComponent', () => {
  let component: LcuMapComponent;
  let fixture: ComponentFixture<LcuMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcuMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcuMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
