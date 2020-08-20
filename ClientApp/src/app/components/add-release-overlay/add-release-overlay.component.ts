import { Component, OnInit, ViewChild, ChangeDetectionStrategy,Output, EventEmitter  } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CustomSoftwareCombobox } from 'src/app/services/shared/CustomSoftwareCombobox';
import { AgGridAngular } from 'ag-grid-angular';
//import { CustomDeleteComponent } from 'src/app/services/shared/customDeletebutton';
import { AddReleaseService } from 'src/app/services/addreleaseservice'
import { deploymentModels, components, software } from 'src/app/components/add-release-overlay/software'
import { Release } from '../create-deployment/release';
import { ReleaseData } from './releaseData';
import { version, versionData } from './version';
import { DynamicGrid } from './dynamicGrid';
import { Router } from '@angular/router';
import { MarketService } from 'src/app/services/market.service';
import { saveData } from './SaveData';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { status } from 'src/app/components/add-release-overlay/status';
import { EditReleaseService } from 'src/app/services/editrelease.service';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';

declare var $: any;
@Component({
  selector: 'app-add-release-overlay',
  templateUrl: './add-release-overlay.component.html',
  styleUrls: ['./add-release-overlay.component.css']
})

export class AddReleaseOverlayComponent implements OnInit {
  //rowData: ReleaseData[] = [];
  //values: any;
  //Software;
  //Version;
  deployment;
  market;
  software: versionData[]
  softwareList: software[];
  //resultList = [];
  deployementModelList: deploymentModels[];
  versionList: any;
  //list: string[];
  version: any;
  selectedValue: any = {};
  //selectedSoftware: string;
  //formBuilder: any;
  submitted = false;
  releaseName: saveData[];
  releaseStatus: saveData[];

  addForm: FormGroup = this.fb.group({
    releaseName: ['', [Validators.required, Validators.minLength(4)]],
    releaseStatus: ['', [Validators.required, Validators.minLength(4)]],
    software: ['', [Validators.required, Validators.minLength(4)]],
    deployment: ['', [Validators.required, Validators.minLength(4)]],
    version: ['', [Validators.required, Validators.minLength(4)]],
  });
  //SoftList: string;
  //selectedVersion: string;
  releaseStatusList: status;

  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};

  @Output() messageEvent = new EventEmitter<boolean>();

  constructor(private EditReleaseService:EditReleaseService,private spinner: NgxSpinnerService, public toastr: ToastrService, public fb: FormBuilder, private AddReleaseService: AddReleaseService, private router: Router) 
  { 
    this.addForm.controls['releaseStatus'].setValue('-1', {onlySelf: true});
    this.addForm.controls['software'].setValue('-1', {onlySelf: true});
    if (this.addForm.controls['software'].value == '-1') {
      this.addForm.controls['version'].disable();
    }
    else {
      this.addForm.controls['version'].enable();
    }
  }
  
  ngOnInit(): void {
    this.addRow();
    this.getStatus();
    this.getsoftwareDeploymentdata();

    this.addForm.controls['releaseStatus'].setValue('-1', {onlySelf: true});
    this.addForm.controls['software'].setValue('-1', {onlySelf: true});
    this.addForm.controls['deployment'].setValue('-1', {onlySelf: true});
    //this.AddReleaseService.getVersion(this.software).subscribe((res:versionData)=>{
    //  console.log(res);
    //this.versionList=res.versions;
   //})
  }

  get registerFormControl() {
    return this.addForm.controls;
  }

  /*onCancelClick() {
    this.deleteRow('index');
    this.addForm.reset();
    $('#app-add-release-overlay').modal('hide');
  }*/

  onCloseClick() {
    this.addForm.reset();

    this.addForm.controls['releaseStatus'].setValue('-1', {onlySelf: true});
    this.addForm.controls['software'].setValue('-1', {onlySelf: true});
    this.addForm.controls['deployment'].setValue('-1', {onlySelf: true});

    this.submitted = false;
    $('#app-add-release-overlay').modal('hide');
  }

  addRow() {
    this.newDynamic = {};
    this.dynamicArray.push(this.newDynamic);

    this.addForm.controls['software'].setValue('-1', {onlySelf: true});
    this.addForm.controls['deployment'].setValue('-1', {onlySelf: true});
    this.addForm.controls['version'].disable();

    return true;
  }

  deleteRow(index) {
    if (this.dynamicArray.length == 1) {
      this.toastr.error("Cannot delete the row, atleast one row is required", 'Warning');
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      return true;
    }
  }

  Save() {
    this.submitted = true;
    console.log(this.addForm);
    const data = {
      market: GlobalConstants.market,
      releaseName: this.addForm.controls['releaseName'].value,
      releaseStatus: this.addForm.controls['releaseStatus'].value,
      components: [{
        software: this.addForm.controls['software'].value,
        deploymentModel: this.addForm.controls['deployment'].value,
        version: this.addForm.controls['version'].value,
      }]
    }
    this.AddReleaseService.setcreaterRelease(JSON.stringify(data)).subscribe((res: saveData) => {
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
      this.spinner.show();
      this.toastr.success('Successfully Submitted');
      this.messageEvent.emit(true);
      this.EditReleaseService.onCreateRelease.emit(true);
      this.router.navigate['/createdeployment'];
      this.addForm.controls['releaseName'].reset();
      this.addForm.controls['releaseStatus'].reset();
      $('#app-add-release-overlay').modal('hide');
      return data;
    }, err => {
      this.toastr.info(err);
    });
  }
  
  getsoftwareDeploymentdata() {
    this.AddReleaseService.getSoftware().subscribe((value: components) => {
      this.softwareList = value.softwares;
      this.deployementModelList = value.deploymentModels;
    })
  }

  onSoftwareChange($event, row: number) {
    this.selectedValue = true;
    this.version = $event.target.value;
    this.softwareList.filter(res => {
      if (res.software == $event.target.value) {
        this.AddReleaseService.getVersion(encodeURIComponent(res.software)).subscribe((res: versionData) => {
          this.versionList = res.versions;
        }, err => {
          console.log(err);
        });
      } else {
        this.selectedValue = false;
      }
    })
    if (this.addForm.controls['software'].value == '-1') {
      this.addForm.controls['version'].disable();
    }
    else {
      this.addForm.controls['version'].enable();
      this.addForm.controls['version'].setValue('-1', {onlySelf: true});      
    }
  }

  /*getSoftwareValue(id: number) {
    this.softwareList.filter((res: software) => {
      if (res.id == id) {
        this.selectedSoftware = res.software;
      }
    })
    return this.selectedSoftware;
  }*/

  getStatus() {
    this.AddReleaseService.getReleaseStatus().subscribe(res => {
      this.releaseStatusList = res;
    });
  }

}
