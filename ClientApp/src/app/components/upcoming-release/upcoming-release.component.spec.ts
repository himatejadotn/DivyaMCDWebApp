import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingReleaseComponent } from './upcoming-release.component';

describe('UpcomingReleaseComponent', () => {
  let component: UpcomingReleaseComponent;
  let fixture: ComponentFixture<UpcomingReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpcomingReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpcomingReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
