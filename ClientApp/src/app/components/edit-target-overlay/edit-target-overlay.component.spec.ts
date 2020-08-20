import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTargetOverlayComponent } from './edit-target-overlay.component';

describe('EditTargetOverlayComponent', () => {
  let component: EditTargetOverlayComponent;
  let fixture: ComponentFixture<EditTargetOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTargetOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTargetOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
