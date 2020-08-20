import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeploymentdetailsComponent } from './deploymentdetails.component';

describe('DeploymentdetailsComponent', () => {
  let component: DeploymentdetailsComponent;
  let fixture: ComponentFixture<DeploymentdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeploymentdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeploymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
