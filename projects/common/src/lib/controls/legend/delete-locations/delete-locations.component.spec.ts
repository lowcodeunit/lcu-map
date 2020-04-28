import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLocationsComponent } from './delete-locations.component';

describe('DeleteLocationsComponent', () => {
  let component: DeleteLocationsComponent;
  let fixture: ComponentFixture<DeleteLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
