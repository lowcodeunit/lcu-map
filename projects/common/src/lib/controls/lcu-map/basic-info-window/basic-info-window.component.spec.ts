import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoWindowComponent } from './basic-info-window.component';

describe('BasicInfoWindowComponent', () => {
  let component: BasicInfoWindowComponent;
  let fixture: ComponentFixture<BasicInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
