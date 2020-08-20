import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReleaseOverlayComponent } from './add-release-overlay.component';

describe('AddReleaseOverlayComponent', () => {
  let component: AddReleaseOverlayComponent;
  let fixture: ComponentFixture<AddReleaseOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReleaseOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReleaseOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
