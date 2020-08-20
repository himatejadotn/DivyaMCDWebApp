import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { JQUERY_TOKEN } from '../../services/shared/jQuery.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Target } from '@angular/compiler';
import { Market } from './market';
import { Release } from './release';
import { CreateDeploymentService } from '../../services/createdeployment.service';
import * as $ from 'jquery'
import { EditReleaseService } from 'src/app/services/editrelease.service';
import { TargetService } from 'src/app/services/target.service';
import { MonitorService } from 'src/app/services/monitor.service';
import { DataService } from 'src/app/services/data.service';
import { targetCount } from './targetcount';
import { Targets } from './target';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { EditData } from '../edit-release-overlay/editData';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';
import{ActivatedRoute,ParamMap} from '@angular/router'
import { from } from 'rxjs';
import { EditTargetData } from '../edit-target-overlay/editTargetData';

declare var $: any;
@Component({
  selector: 'app-create-deployment',
  templateUrl: './create-deployment.component.html',
  styleUrls: ['./create-deployment.component.css']
})
export class CreateDeploymentComponent implements OnInit {

  //var jQuery:any;
  deploymentFormGroup: FormGroup;
  editTargetForm:FormGroup;
  releases: Release[] = [];
  markets: Array<Market>;
  targets: Targets[] = [];
  selectedValue: string;
  targetData: Target[];
  buttonDisabled: boolean = true;
  buttonDisabledEdit:boolean=true;
  marketStoreCount: number;
  targetStoreCount: number;
  selectedReleaseId: number;
  selectedTargetId:number;
  selectedTarget: Targets;
  selectedTargetName: string;
  selectedRelease: string;
  market;
  targetId: any;
  passedTarget: boolean;
  submitted = false;
  currentSubscription: any;

  constructor(private spinner: NgxSpinnerService, public toastr: ToastrService, private fb: FormBuilder, private router: Router, private EditReleaseService: EditReleaseService,private TargetService: TargetService, private CreateDeploymentService: CreateDeploymentService, private dataService: DataService, private activatedRoute:ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.currentSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit(): void {
      this.deploymentFormGroup = new FormGroup({
      target: new FormControl(),
      release: new FormControl(),
      storeLimit: new FormControl(),
    });

    //this.targetStoreCount =;
    this.passedTarget = false;
    this.deploymentFormGroup = this.fb.group({
      market: '',
      target: new FormControl('', Validators.required),
      release: new FormControl('', [Validators.required]),
      storeLimit: new FormControl(GlobalConstants.storeLimit, Validators.required),
      selectedTarget: '',
      selectedRelease: ''
    });
    this.getReleaseId(7);
    this.getReleaseData('');
    this.getTargetData('', false);
    this.getTargetCountData(this.passedTarget,'');

    this.deploymentFormGroup.get('market').valueChanges.subscribe(val => {
      //this.targets= this.CreateDeploymentService.getTarget(val);
    });
    this.EditReleaseService.onEditRelease.subscribe((event: boolean) => {
      if (event) {
        this.CreateDeploymentService.getRelease(this.market).subscribe(val => {
          this.releases = val;
        });
        this.selectedReleaseId = this.EditReleaseService.id;
      }
    });
    this.EditReleaseService.onCreateRelease.subscribe((event: boolean) => {
      if (event) {
        this.CreateDeploymentService.getRelease(this.market).subscribe(val => {
          this.releases = val;
          this.selectedRelease = val[0].name;
          this.selectedReleaseId = val[0].id;
        });
        this.selectedReleaseId = this.EditReleaseService.id;
        this.deploymentFormGroup.controls['release'].markAsTouched();
        this.deploymentFormGroup.controls['release'].setErrors(null);
      }
    })
    this.EditReleaseService.onDeleteRelease.subscribe((event: boolean) => {
      if (event) {
        this.CreateDeploymentService.getRelease(this.market).subscribe(val => {
          this.releases = val;
        });
        this.selectedReleaseId = this.EditReleaseService.id;
      }
    })

    this.EditReleaseService.idChanged.subscribe((event: boolean) => {
      if (event) {
        this.EditReleaseService.getEditRelease(this.EditReleaseService.id).subscribe((res: EditData) => {
          this.selectedRelease = res.releaseName;
          this.selectedReleaseId = res.id;
        }, err => {
          console.log(err);
        });
      }
    });

    this.TargetService.targetidChanged.subscribe((event: boolean) => {
      if (event) {
        this.TargetService.editTarget(this.TargetService.id).subscribe((res: EditTargetData) => {
          this.selectedTargetName = res[0].name;
          this.targetName= res[0].name;
          this.selectedTargetId = this.TargetService.id;
          this.CreateDeploymentService.getTargetCount(GlobalConstants.market, this.targetName).subscribe((res: targetCount) => {
            this.targetStoreCount = res.targetStoreCount;
          })
        }, err => {
          console.log(err);
        });
      }
    });

    this.TargetService.onDeleteTarget.subscribe((event: boolean) => {
      if (event) {
        this.CreateDeploymentService.getTargetName(this.market).subscribe(val => {
          this.targets = val;
        });
        this.selectedTargetId = this.TargetService.id;
        console.log(this.TargetService.id)
      }
    });

    this.TargetService.onEditTarget.subscribe((event: boolean) => {
      if (event) {
        this.CreateDeploymentService.getTargetName(this.market).subscribe(val => {
          this.targets = val;
        });
        this.selectedTargetId = this.TargetService.id;
        console.log(this.TargetService.id)
      }
    });
   
  //   this.router.ParamMap.subscribe(params =>{
  //     const targetId:params.get('id');
  //     if(targetId){
  //       this.getTarget(targetId)
  //     }
  //   })
  // }
  // getTarget(id:number){
  // this.CreateDeploymentService.getRelease(id).subscribe();
   }

  showDeployment() {
    this.submitted = true;

    if (this.deploymentFormGroup.invalid) {
      return;
    }
    else {
      if (this.targetStoreCount == 0) {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.spinner.show();
        this.toastr.info('Deployment can not be created without stores.');
      }
      else if (this.targetStoreCount > this.deploymentFormGroup.controls['storeLimit'].value) {
        this.toastr.info('Deployment can not be created for target store count greater then store limit for given market.');
      }
      else {
        this.selectedTarget = this.deploymentFormGroup.controls['target'].value;
        this.dataService.setOption('storeLimit', this.deploymentFormGroup.controls['storeLimit'].value);
        this.dataService.setOption('targetStoreCount', this.targetStoreCount);
        this.dataService.setOption('targetName', this.selectedTargetName);
        this.dataService.setOption('targetId',  this.selectedTargetId);
        this.dataService.setOption('releaseName', this.selectedRelease);
        this.dataService.setOption('releaseId', this.selectedReleaseId);
        this.router.navigate(['/createDeploymentStepTwo']);
      }
    }
  }
  showEditRelease() {
    $('#app-edit-release-overlay').modal("show");
  }
  showAddRelease() {
    $('#app-add-release-overlay').modal("show");
  }

  showCreateTarget() {
    $('#app-create-target-overlay').modal("show");
  }

  showEditTarget() {
   $('#app-edit-target-overlay').modal("show");
   this.selectedTarget = this.deploymentFormGroup.controls['target'].value;
   this.dataService.setOption('editTargetId', this.TargetService.id);
   this.dataService.setOption('editTargetName', this.selectedTarget.targetName);
   console.log( this.TargetService.id);
   console.log(this.selectedTarget.targetName);
  }

  targetName: string;
  sampleMarket: string = GlobalConstants.market;

  receiveMessage($event) {
    this.targetName = $event
    this.sampleMarket = GlobalConstants.market;
    this.passedTarget = true;
    this.getTargetData(this.sampleMarket, this.passedTarget);
    this.getTargetCountData(this.passedTarget,this.targetName);
    this.deploymentFormGroup.controls['target'].markAsTouched();
    this.deploymentFormGroup.controls['target'].setErrors(null);
  }

  receiveReleaseMessage($event) {
    this.getReleaseData(GlobalConstants.market);
  }

  getReleaseData(market) {
    this.CreateDeploymentService.getRelease(market).subscribe(val => {
      this.releases = val;
    });
  }
  getReleaseId(id: number) {
    this.releases.filter((res) => {
      if (res.id == id) {
        this.selectedReleaseId = res.id;
      }
    });
    return this.selectedReleaseId;
  }

  getTargetData(market, passedTargetFlag) {
    this.CreateDeploymentService.getTargetName(market).subscribe((res: Targets[]) => {
      this.targets = res;
      if (passedTargetFlag == true) {
        this.selectedTarget = { targetName: res[0].targetName, targetId: res[0].targetId };
        this.selectedTargetName = res[0].targetName;
        this.selectedTargetId = res[0].targetId;
      }
    })
  }
  getTargetCountData(passedTargetFlag,targetName) {
    this.CreateDeploymentService.getTargetCount(GlobalConstants.market, this.targetName).subscribe((res: targetCount) => {
        this.targetStoreCount = res.targetStoreCount;
       })
    // this.deploymentFormGroup.get('target').valueChanges.subscribe((val: Targets) => {
    //   //when it loads for the first time
    //   if (val == undefined) {
    //     this.targetName = "";
    //     this.targetStoreCount = 0;
    //   }
    //   else if ((passedTargetFlag == false || passedTargetFlag == undefined) && val != undefined) {
    //     this.targetName = val.targetName;
    //     console.log( this.selectedTargetName);
    //     // this.CreateDeploymentService.getTargetCount(GlobalConstants.market, this.selectedTargetName).subscribe((res: targetCount) => {
    //     //   this.targetStoreCount = res.targetStoreCount;
    //     // })
    //   }
    //   else {
    //     // this.CreateDeploymentService.getTargetCount(GlobalConstants.market, this.targetName).subscribe((res: targetCount) => {
    //     //   this.targetStoreCount = res.targetStoreCount;
    //     // })
    //   }
    // })
  }
  onChange($event) {
    if (this.selectedValue == '1') {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
    this.EditReleaseService.id = $event.target.value;
    this.EditReleaseService.idChanged.emit(true);
  }

  onChangeTarget($event){
  this.TargetService.id = $event.target.value;
  this.TargetService.targetidChanged.emit(true);
  }
 

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
  }

  get registerFormControl() {
    return this.deploymentFormGroup.controls;
  }
  ngOnDestroy() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
  }
}
