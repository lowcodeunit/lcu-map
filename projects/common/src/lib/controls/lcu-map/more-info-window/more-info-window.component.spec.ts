import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreInfoWindowComponent } from './more-info-window.component';

describe('MoreInfoWindowComponent', () => {
  let component: MoreInfoWindowComponent;
  let fixture: ComponentFixture<MoreInfoWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreInfoWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreInfoWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
