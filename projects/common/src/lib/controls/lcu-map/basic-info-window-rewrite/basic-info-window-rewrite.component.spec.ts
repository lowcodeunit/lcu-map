import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoWindowRewriteComponent } from './basic-info-window-rewrite.component';

describe('BasicInfoWindowRewriteComponent', () => {
  let component: BasicInfoWindowRewriteComponent;
  let fixture: ComponentFixture<BasicInfoWindowRewriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicInfoWindowRewriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicInfoWindowRewriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
