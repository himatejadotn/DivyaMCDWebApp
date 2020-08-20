import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Region } from './Region';
import { StoreType } from './StoreType';
import { TargetService } from 'src/app/services/target.service';
import { Stores, StoreList } from './Stores';
import { SaveTargetData } from './saveTargetData';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';
import { ButtonRendererComponent } from 'src/app/services/shared/button-renderer.component';
import { GridButtonComponent } from 'src/app/services/shared/grid-button.component';
import { GridApi } from 'ag-grid-community';
import { single } from 'rxjs/operators';
import { GridOptions } from 'ag-grid-community';

declare var $: any;
@Component({
  selector: 'app-create-target-overlay',
  templateUrl: './create-target-overlay.component.html',
  styleUrls: ['./create-target-overlay.component.css'],
})
export class CreateTargetOverlayComponent implements OnInit {
  createTargetForm: FormGroup;
  submitted = false;
  storeList: StoreList[];
  storeCheck = 'storeList';
  //flowType: number = 2;
  enablefilterselection: boolean = false;
  regionList: Array<Region>;
  storeTypeList: Array<StoreType>;
  ownerOperator: string;
  targetName: string;
  storeId: Number;
  radioOne: boolean = true;
  selectedRegion: string;
  SelectedStoreType: string;
  selectedOperator: string;
  selectedStoreId: string;
  filter: true;
  storeIdValue = '';
  // Grid Properties
  private gridApi;
  private gridOptions;
  private gridColumnApi;
  private rowHeight;
  //private rowSelection;
  rowData = [];
  mySubscription: any;
  paginationPageSize;

  defaultColDef: {
    flex: number;
    minWidth: number;
    resizable: boolean;
    filter: boolean;
  };
  rowSelection: 'single';
  animateRows: true;
  @Output() messageEvent = new EventEmitter<string>();
  frameworkComponents: { buttonRenderer: typeof ButtonRendererComponent };
  rowDataClicked1: any;

  constructor(
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    private targetService: TargetService,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.frameworkComponents = {
      buttonRenderer: ButtonRendererComponent,
    };

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
      filter: true,
    };
    //this.rowSelection = 'multiple';
  }
  columnDefs = [
    {
      headerName: 'Store ID',
      field: 'storeId',
      sortable: true,
      lockPosition: true,
      //floatingFilter: true,
      width: 400,
    },

    {
      headerName: '',
      field: '',
      width: 400,
      //floatingFilter: true,
      sortable: true,
      lockPosition: true,
      cellRenderer: 'buttonRenderer',
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: 'Click 1',

      },
    },
  ];
  ngOnInit(): void {
    this.createTargetForm = this.fb.group({
      targetName: [''[(Validators.required, '')]],
    });
    // this.onGetInitialData();

    this.createTargetForm = new FormGroup({
      targetName: new FormControl(),
      storeList: new FormGroup({
        storeCheck: new FormControl(),
      }),
      filter: new FormControl(),
      storeIds: new FormControl(),
    });
  }

  enablestorefilter() { }

  onGridReady(params) {
    this.gridOptions = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptions.refreshCells();
    // this.targetService.getFilters().subscribe((value: Stores) => {
    //   this.storeList = value.stores;
    //   this.rowData = value.stores;
    //  params.api.setRowData(value.stores);
    //   console.log(params);
    // });
  }

  get registerFormControl() {
    return this.createTargetForm.controls;
  }

  Save() {
    console.log(this.createTargetForm);
    this.submitted = true;
    this.selectedStoreId =
      this.gridOptions.getFilterInstance('storeId').appliedModel == undefined
        ? ''
        : this.gridOptions.getFilterInstance('storeId').appliedModel.filter;
    // this.selectedRegion =
    //   this.gridOptions.getFilterInstance('region').appliedModel == undefined
    //     ? ''
    //     : this.gridOptions.getFilterInstance('region').appliedModel.filter;
    // this.SelectedStoreType =
    //   this.gridOptions.getFilterInstance('allDayStoreType').appliedModel ==
    //   undefined
    //     ? ''
    //     : this.gridOptions.getFilterInstance('allDayStoreType').appliedModel.filter;
    // this.selectedOperator =
    // this.gridOptions.getFilterInstance('ownerOperator').appliedModel == undefined
    //   ? ''
    //   : this.gridOptions.getFilterInstance('ownerOperator').appliedModel.filter;
    this.targetName = this.createTargetForm.controls['targetName'].value;
    //this.storeList = this.createTargetForm.controls['storeList'].value;
    //this.storeCheck = this.createTargetForm.controls['storeCheck'].value;
    //this.storeId = this.createTargetForm.controls['storeIds'].value;

    const data = {
      market: GlobalConstants.market,
      name: this.targetName.trim(),
      filters: [
        {
          storeId: this.selectedStoreId,
          region: this.selectedRegion,
          allDayStoreType: this.SelectedStoreType,
          ownerOperator: this.selectedOperator,
        },
      ],

      stores: this.rowData
    };
    if (this.createTargetForm.valid == true) {
      if (this.targetName.trim() == '') {
        setTimeout(() => {
          /** spinner ends after 2 seconds */
          this.spinner.hide();
        }, 2000);
        this.spinner.show();
        this.toastr.info('Please add target name.');
      }
      // else if (
      //   this.selectedStoreId == '' &&
      //   this.selectedRegion == '' &&
      //   this.SelectedStoreType == '' &&
      //   this.selectedOperator == ''
      // ) {
      //   setTimeout(() => {
      //     /** spinner ends after 5 seconds */
      //     this.spinner.hide();
      //   }, 5000);
      //   this.spinner.show();
      //   //this.toastr.info('Please select at least one filter.');
      // } 
      else if (this.rowData.length <= 0) {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
        this.spinner.show();
        this.toastr.info('Please select at least one filter.');
      }
      else {
        console.log(this.rowData);
        console.log(JSON.stringify(data));
        this.targetService.SaveCreateTarget(JSON.stringify(data)).subscribe(
          (res: SaveTargetData) => {
            console.log(data);
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 5000);
            this.spinner.show();
            this.toastr.success('Successfully Submitted');
            this.submitted = false;
            this.targetName = this.createTargetForm.controls['targetName'].value;
            this.messageEvent.emit(this.targetName.trim());
            this.createTargetForm.controls['targetName'].reset();
            this.createTargetForm.controls['storeList'].reset();
            this.createTargetForm.controls['storeIds'].reset();
            // this.createTargetForm.controls['selectedStoreId'].reset();

            //clear all filter
            this.gridOptions.destroyFilter('storeId');
            this.gridOptions.destroyFilter('region');
            this.gridOptions.destroyFilter('allDayStoreType');
            this.gridOptions.destroyFilter('ownerOperator');

            this.selectedStoreId = '';
            this.selectedRegion = '';
            this.SelectedStoreType = '';
            this.selectedOperator = '';
            this.targetName = '';

            $('#app-create-target-overlay').modal('hide');
          },
          (err) => {
            this.toastr.info(err);
          }
        );
      }
    }
  }

  onGetInitialData() {
    this.targetService.getFilters().subscribe((value: Stores) => {
      this.storeList = value.stores;
      this.regionList = value.regions;
      this.storeTypeList = value.allDayStoreTypes;
      // this.rowData = value.stores;
    });
  }

  addStore() {
    this.targetService.addStores((this.storeIdValue)).subscribe(
      (res) => {
        const newdata = {
          allDayStoreType: '',
          market: '',
          ownerOperator: '',
          region: '',
          storeId: this.storeIdValue,

        };
        console.log(this.storeIdValue.split(','))
        const previous = this.rowData;
        this.gridOptions.applyTransaction({ remove: this.rowData });
        const list = this.storeIdValue.split(',');
        for (let i = 0; i < list.length; i++) {
          if (res['stores'][i].valid) {
            previous.push(this.listadd(list[i]));

          } else {
            console.log("Error Message", res['stores'][i].storeId);
            this.toastr.info("Message: StoreId " + res['stores'][i].storeId + " Not found");

          }
          //console.log(res.stores[i]);
        }
        console.log(this.rowData);
        console.log(this.gridOptions);
        this.gridOptions.applyTransaction({ add: previous });
        this.gridOptions.refreshCells();
      },
      (err) => {
        this.toastr.info(err);
      }
    );
  }

  listadd(id) {
    const newdata = {
      allDayStoreType: '',
      market: '',
      ownerOperator: '',
      region: '',
      storeId: id

    };
    // this.gridOptions.applyTransaction({ add: previous });
    return newdata;
  }

  onBtnClick1(data) {
    console.log(this.rowData);
    const index = this.rowData.findIndex(
      (obj) => obj.storeId === data.rowData.storeId
    );
    const newdata = this.rowData;
    this.gridOptions.applyTransaction({ remove: this.rowData });
    newdata.splice(index, 1);
    this.gridOptions.applyTransaction({ add: newdata });
    this.gridOptions.refreshCells();
  }

  // deleteTarget($event){
  //   let selectedData = this.gridOptions.getSelectedRows();
  //   let rowData = this.gridOptions.applyTransaction({ remove: selectedData })
  // }

  deleterow() { }

  onCloseClick() {
    this.createTargetForm.reset();
    this.submitted = true;
    //clear all filter
    this.gridOptions.destroyFilter('storeId');
    this.gridOptions.destroyFilter('region');
    this.gridOptions.destroyFilter('allDayStoreType');
    this.gridOptions.destroyFilter('ownerOperator');

    this.selectedStoreId = '';
    this.selectedRegion = '';
    this.SelectedStoreType = '';
    this.selectedOperator = '';

    $('#app-create-target-overlay').modal('hide');
  }
  onAddStore() {
    console.log();
  }
}
