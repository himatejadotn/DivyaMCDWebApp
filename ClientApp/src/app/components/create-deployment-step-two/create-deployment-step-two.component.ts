import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { CreateDeploymentService } from '../../services/createdeployment.service';
import { DataService } from 'src/app/services/data.service';
import { targetCount } from '../create-deployment/targetcount';
import { MultipleDeployments } from './mulitple-deployments';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Deployment } from '../create-deployment/deployment';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';
import { RxwebValidators, date } from '@rxweb/reactive-form-validators';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-create-deployment-step-two',
  templateUrl: './create-deployment-step-two.component.html',
  styleUrls: ['./create-deployment-step-two.component.css']
})
export class CreateDeploymentStepTwoComponent implements OnInit {

  dynamicForm: FormGroup;
  submitted: boolean;
  minDate: Date;
  count: number = 1;
  public data;
  appendDate: any;

  deploymentName: string;
  effectiveDate: string;
  comments: string;

  storeLimit: number;
  targetStoreCount: number;
  releaseId: string;
  targetId: string;
  releaseName: string;
  targetName: string;
  effectiveDateISOString: string;
  //pipe for converting date to a specific format
  pipe = new DatePipe('en-US');

  constructor(private location: Location, private spinner: NgxSpinnerService, public toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private CreateDeploymentService: CreateDeploymentService, private dataService: DataService) {
    this.data = dataService.getOption();
    this.minDate = new Date();
    this.submitted = false;

    this.storeLimit = Number(this.data.storeLimit);
    this.targetStoreCount = Number(this.data.targetStoreCount);
    this.releaseId = this.data.releaseId;
    this.targetId = this.data.targetId;
    this.releaseName = this.data.releaseName;
    this.targetName = this.data.targetName;

    this.minDate.setDate(this.minDate.getDate());
  }
  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      deploymentName: ['', Validators.required],
      effectiveDate: ['', [Validators.required]],
      comments: ''
    });
  }

  onSubmit() {
    this.submitted = true;

    this.deploymentName = this.dynamicForm.controls['deploymentName'].value;
    //this.effectiveDate = this.effectiveDateISOString;
    this.comments = this.dynamicForm.controls['comments'].value;
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    if(this.deploymentName.trim()==''){
      this.toastr.info('Deployment name can not be blank!!');
      return;
    }

    const dataToSend = {
      id: 0,
      market: GlobalConstants.market,
      status: "",
      createdBy: GlobalConstants.userName,
      storeLimit: Number(this.storeLimit),
      targetStoreCount: Number(this.targetStoreCount),
      releaseId: Number(this.releaseId),
      targetId: Number(this.targetId),
      releaseName: this.releaseName,
      targetName: this.targetName,
      deploymentDetails: [
        {
          "deploymentName": this.deploymentName.trim(),
          "effectiveDate": this.effectiveDate,
          "comments": this.comments
        }]
    }
    console.log(dataToSend);
    this.CreateDeploymentService.SaveDeployment(dataToSend).subscribe((res: Deployment) => {
      setTimeout(() => {
        /** spinner ends after 2 seconds */
        this.spinner.hide();
      }, 2000);
      this.spinner.show();
      this.toastr.success('Deployment Successfully Created !!');

      //this.submitted = false;
      this.router.navigate(['/monitoring']);
    }
      , err => {
        this.toastr.info(err);
      });
  }

  Back() {
    // clear errors and reset deployment fields
    this.submitted = false;
    this.location.back();
  }

  showDeployment() {
    this.router.navigate(['/monitoring']);
  }

  onValueChange(value: Date): void {
    this.appendDate = this.pipe.transform(value, GlobalConstants.DATE_FMT);
    if (value != null) {
      //set effective date to 'yyyy-MM-dd' format
      this.effectiveDate = this.pipe.transform(value, GlobalConstants.deployment_Date_Format);
      this.effectiveDateISOString = value.toISOString();

      if (this.pipe.transform(value, GlobalConstants.DATE_FMT) ==  this.pipe.transform(this.minDate, GlobalConstants.DATE_FMT)) {
        setTimeout(() => {
          /** spinner ends after 2 seconds */
          this.spinner.hide();
        }, 2000);
        this.spinner.show();
        this.toastr.success('Deployment will trigger immediately !!');
      }
    }
    

    if (this.dynamicForm.controls["deploymentName"].value == '' && value != null) {
      if (this.pipe.transform(value, GlobalConstants.DATE_FMT) <  this.pipe.transform(this.minDate, GlobalConstants.DATE_FMT)) {
        this.dynamicForm.controls["deploymentName"].setValue(this.targetName + ', ' + this.pipe.transform(this.minDate, GlobalConstants.DATE_FMT));
      }
      else{
      this.dynamicForm.controls["deploymentName"].setValue(this.targetName + ', ' + this.appendDate);
      }
    }
  }
}
