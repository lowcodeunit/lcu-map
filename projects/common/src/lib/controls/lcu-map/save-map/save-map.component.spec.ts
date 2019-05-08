import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMapComponent } from './save-map.component';

describe('SaveMapComponent', () => {
  let component: SaveMapComponent;
  let fixture: ComponentFixture<SaveMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
