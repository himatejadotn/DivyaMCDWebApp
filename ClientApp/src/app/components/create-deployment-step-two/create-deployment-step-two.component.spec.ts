import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeploymentStepTwoComponent } from './create-deployment-step-two.component';

describe('CreateDeploymentStepTwoComponent', () => {
  let component: CreateDeploymentStepTwoComponent;
  let fixture: ComponentFixture<CreateDeploymentStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDeploymentStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeploymentStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
