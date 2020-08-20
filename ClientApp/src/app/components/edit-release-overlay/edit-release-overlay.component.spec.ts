import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReleaseOverlayComponent } from './edit-release-overlay.component';

describe('EditReleaseOverlayComponent', () => {
  let component: EditReleaseOverlayComponent;
  let fixture: ComponentFixture<EditReleaseOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditReleaseOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditReleaseOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
