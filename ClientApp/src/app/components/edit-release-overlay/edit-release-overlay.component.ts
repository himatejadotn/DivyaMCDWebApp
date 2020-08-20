import { Component, OnInit, Input, Inject, ɵConsole, Output,
  EventEmitter, } from '@angular/core';
import { JQUERY_TOKEN } from '../../services/shared/jQuery.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomSoftwareCombobox } from 'src/app/services/shared/CustomSoftwareCombobox';
import { EditReleaseService } from 'src/app/services/editrelease.service';
import { CreateDeploymentService } from 'src/app/services/createdeployment.service';
import { EditData, Softcomponents } from './editData';
import { components, software } from '../add-release-overlay/software';
import { AddReleaseService } from 'src/app/services/addreleaseservice';
import { DynamicGrid } from '../add-release-overlay/dynamicGrid';
import { saveData } from '../add-release-overlay/SaveData';
import { versionData } from '../add-release-overlay/version';
import { ReleaseData } from '../add-release-overlay/releaseData';
import { deploymentModels } from '../add-release-overlay/software';
import { status } from 'src/app/components/add-release-overlay/status';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/services/shared/confirmation-dialog/confirmation-dialog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { ConfirmationDialogService } 'src/app/services.'
declare var $: any;
@Component({
  selector: 'app-edit-release-overlay',
  templateUrl: './edit-release-overlay.component.html',
  styleUrls: ['./edit-release-overlay.component.css'],
})
export class EditReleaseOverlayComponent implements OnInit {
  rowData: ReleaseData[] = [];
  values: any;
  Software;
  deployments;
  market;
  //deployments:string;
  softwareList: software[];
  resultList = [];
  deployementModelList: deploymentModels[];
  versionList: any;
  list: string[];
  version;
  selectedValue: any = {};
  selectedSoftware: string;
  formBuilder: any;
  submitted = false;
  releaseName: saveData[];
  releaseStatus: saveData[];
  /***** */
  paginationPageSize;
  @Input() dialogTitle: string;
  @Input() dialogWidth: string;
  columnDefs: { headerName: string; field: string }[];
  editRowData: EditData[];
  releaseStatusList: status;
  selectedid: any;
  editReleaseData: Softcomponents[];
  software: string;
  softwareid: string;
  editForm: FormGroup = this.fb.group({
    releaseName: ['', [Validators.required, Validators.minLength(4)]],
    releaseStatus: ['', [Validators.required, Validators.minLength(4)]],
    software: ['', [Validators.required, Validators.minLength(4)]],
    deploymentModel: ['', [Validators.required, Validators.minLength(4)]],
    version: ['', [Validators.required, Validators.minLength(4)]],
  });
  name: string;
  status: string;
  @Output() messageEvent = new EventEmitter<string>();
  constructor(
    private activeModal: NgbActiveModal,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    private AddReleaseService: AddReleaseService,
    public fb: FormBuilder,
    private EditReleaseService: EditReleaseService,
    private CreateDeploymentService: CreateDeploymentService
  ) {}

  dynamicArray: Array<DynamicGrid> = [];
  newDynamic: any = {};
  get registerFormControl() {
    return this.editForm.controls;
  }
  ngOnInit(): void {
    this.newDynamic = {
      software: this.software,
      deployment: this.deployments,
      version: this.version,
    };
    this.dynamicArray.push(this.newDynamic);
    this.onGetdata();
    this.getStatus();
    // this.getversion();
    // this.AddReleaseService.getVersion().subscribe((res: versionData) =>{
    //   this.versionList=res.versions;
    // }),
    this.EditReleaseService.idChanged.subscribe((event: boolean) => {
      if (event) {
        this.softwareid = this.getSoftwareValue(
          this.editForm.controls['software'].value
        );
        this.EditReleaseService.getEditRelease(
          this.EditReleaseService.id
        ).subscribe((res: EditData) => {
          this.name = res.releaseName;
          this.status = res.releaseStatus;
          this.editReleaseData = res.components;
          this.software = this.editReleaseData[0].software;
          this.deployments = this.editReleaseData[0].deploymentModel;
          this.AddReleaseService.getVersion(
            encodeURIComponent(this.software)
          ).subscribe(
            (res: versionData) => {
              this.versionList = res.versions;
            },
            (err) => {
              console.log(err);
            }
          );
          this.version = this.editReleaseData[0].version;
          return this.version;

          console.log(res);
        });
      }
    });
  }
  onCancelClick() {
    $('#app-add-release-overlay').modal('hide');
  }
  onCloseClick() {
    $('#app-edit-release-overlay').modal('hide');
  }
  addRow() {
    this.newDynamic = {};
    this.dynamicArray.push(this.newDynamic);
    console.log(this.dynamicArray);
    return true;
    // this.dynamicArray.push({ software: this.addForm.controls['software'].value,
    // deployment: this.addForm.controls['deployment'].value,
    // version: this.addForm.controls['version'].value });
    // return true;
  }
  deleteRow(index) {
    if (this.dynamicArray.length == 0) {
      return false;
    } else {
      this.dynamicArray.splice(index, 1);
      return true;
    }
  }
  onGetdata() {
    this.AddReleaseService.getSoftware().subscribe((value: components) => {
      this.softwareList = value.softwares;
      this.deployementModelList = value.deploymentModels;
    });
  }
  // getversion(){

  //       this.AddReleaseService.getVersion(encodeURIComponent(res.software)).subscribe((res: versionData) => {
  //         this.versionList = res.versions;
  //       }

  // }
  onSoftwareChange($event) {
    this.selectedValue = true;
    this.version = $event.target.value;
    this.softwareList.filter((res) => {
      if (res.software == $event.target.value) {
        this.AddReleaseService.getVersion(
          encodeURIComponent(res.software)
        ).subscribe(
          (res: versionData) => {
            this.versionList = res.versions;
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.selectedValue = false;
      }
    });
  }
  save() {
    console.log(this.editForm);
    const data = {
      market: 'WW',
      releaseName: this.editForm.controls['releaseName'].value,
      releaseStatus: this.editForm.controls['releaseStatus'].value,
      components: [
        {
          software: this.editForm.value.software,
          deploymentModel: this.editForm.value.deploymentModel,
          version: this.editForm.value.version,
        },
      ],
    };

    this.EditReleaseService.UpdateReleaseData(
      this.EditReleaseService.id,
      data
    ).subscribe(
      (res: EditData) => {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
        this.spinner.show();
        this.toastr.success('Successfully Submitted');
        this.EditReleaseService.onEditRelease.emit(true);
        $('#app-edit-release-overlay').modal('hide');
        this.router.navigate['/createdeployment'];
        // this.editForm.controls['releaseName'].reset();
        // this.editForm.controls['releaseStatus'].reset();
      },
      (err) => {
        alert('Please Fill all the fields');
      }
    );
  }
  getSoftwareValue(id: number) {
    this.softwareList.filter((res: software) => {
      if (res.id == id) {
        this.selectedSoftware = res.software;
      }
    });
    return this.selectedSoftware;
  }

  showDeleterealse() {
    $('#app-deleteRealse').modal('show');
  }
  deleteRealse() {
    this.EditReleaseService.deleteReleaseData(
      this.EditReleaseService.id
    ).subscribe($('#app-deleteRealse').modal('hide'));
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    this.messageEvent.emit('');
    this.spinner.show();
    this.toastr.success('Successfully deleted');
    this.editForm.reset();
    $('#app-edit-release-overlay').modal('hide');
    // this.editForm.controls['releaseName'].reset();
    // this.editForm.controls['releaseStatus'].reset();
    // this.editForm.controls['software'].reset(),
    //   this.editForm.controls['deploymentModel'].reset(),
    //   this.editForm.controls['version'].reset();

    // this.activeModal.close(true);
  }
  getStatus() {
    this.AddReleaseService.getReleaseStatus().subscribe((res) => {
      this.releaseStatusList = res;
    });
  }
}
