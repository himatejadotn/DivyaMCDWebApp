import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTargetOverlayComponent } from './create-target-overlay.component';

describe('CreateTargetOverlayComponent', () => {
  let component: CreateTargetOverlayComponent;
  let fixture: ComponentFixture<CreateTargetOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTargetOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTargetOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
