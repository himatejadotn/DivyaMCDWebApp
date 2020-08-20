import { Component, OnInit, Input } from '@angular/core';
import {
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
import { Region } from '../create-target-overlay/Region';
import { StoreType } from '../create-target-overlay/StoreType';
import { TargetService } from 'src/app/services/target.service';
import { Stores, StoreList } from '../create-target-overlay/Stores';
import { SaveTargetData } from '../create-target-overlay/SaveTargetData';
import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';
import { ConfirmationDialogService } from 'src/app/services/shared/confirmation-dialog/confirmation-dialog.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { EditTargetData } from './editTargetData';
import { ButtonRendererComponent } from 'src/app/services/shared/button-renderer.component';

declare var $: any;
@Component({
  selector: 'app-edit-target-overlay',
  templateUrl: './edit-target-overlay.component.html',
  styleUrls: ['./edit-target-overlay.component.css'],
})
export class EditTargetOverlayComponent implements OnInit {
  editTargetForm: FormGroup;
  submitted = false;
  storeList: StoreList[];
  editRowData: EditTargetData[];

  storeCheck = 'storeList';
  //flowType: number = 2;
  enablefilterselection: boolean = false;
  regionList: Array<Region>;
  storeTypeList: Array<StoreType>;
  ownerOperator: string;
  targetName: string;
  radioOne: boolean = true;
  selectedRegion: string;
  SelectedStoreType: string;
  selectedOperator: string;
  selectedStoreId: string;
  filter: true;
  id: any;
  market: any;
  name: any;
  filters: any;
  storeIdValue = '';
  // Grid Properties
  private gridApi;
  public gridOptions;
  private gridColumnApi;
  private rowHeight;
  public data;
  rowData = [];
  paginationPageSize;
  defaultColDef: {
    flex: number;
    minWidth: number;
    resizable: boolean;
    filter: boolean;
  };
  rowSelection = 'single';
  @Output() messageEvent = new EventEmitter<string>();
  frameworkComponents: { buttonRenderer: typeof ButtonRendererComponent };

  constructor(
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,
    private targetService: TargetService,
    public fb: FormBuilder,
    private router: Router,
    private confirmationDialogService: ConfirmationDialogService,
    private dataService: DataService
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
    this.rowSelection = 'single';
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
        onClick: this.onBtnClick2.bind(this),
        label: 'Click 1',

      },
    },
  ];

  ngOnInit(): void {
    this.data = this.dataService.getOption();
    console.log(this.data);
    //console.log(this.data.selectedTarget.targetName);

    this.editTargetForm = this.fb.group({
      targetName: [''[(Validators.required, '')]],
    });
    //this.onGetInitialData();

    this.editTargetForm = new FormGroup({
      targetName: new FormControl(),
      storeList: new FormGroup({
        storeCheck: new FormControl(),
      }),
      filter: new FormControl(),
      storeIds: new FormControl(),
    });

    this.targetService.targetidChanged.subscribe((event: boolean) => {
      if (event) {
        this.targetService.editTarget(this.targetService.id).subscribe(
          (resp: EditTargetData) => {
            console.log(resp);
            this.id = this.targetService.id;
            this.market = resp[0].market;
            this.name = resp[0].name;
            this.filters = resp[0].filters;
              this.storeList = resp[0].stores;
              this.rowData = resp[0].stores.stores;
          },
          (err) => {
            console.log(err);
          }
        );
        return;
      }
    });
  }

  onGridReady(params) {
    this.gridOptions = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setRowData(this.rowData);

    // this.targetService.getFilters().subscribe((value: Stores) => {
    //   this.storeList = value.stores;
    //   this.rowData = value.stores;
    //   params.api.setRowData(value.stores);
    // });
  }

  get registerFormControl() {
    return this.editTargetForm.controls;
  }

  Save() {
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
    this.targetName = this.editTargetForm.controls['targetName'].value;
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
      stores: [
        {
          market: 'string',
          storeId: this.storeIdValue,
          //storeId: "string",
          region: 'string',
          allDayStoreType: 'string',
          ownerOperator: 'string',
        },
      ],
    };
    if (this.editTargetForm.valid == true) {
      if (this.targetName.trim() == '') {
        setTimeout(() => {
          /** spinner ends after 2 seconds */
          this.spinner.hide();
        }, 2000);
        this.spinner.show();
        this.toastr.info('Please add target name.');
      } else if (
        this.selectedStoreId == '' &&
        this.selectedRegion == '' &&
        this.SelectedStoreType == '' &&
        this.selectedOperator == ''
      ) {
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
        this.spinner.show();
        //this.toastr.info('Please select at least one filter.');
      } else {
        this.targetService.SaveCreateTarget(JSON.stringify(data)).subscribe(
          (res: SaveTargetData) => {
            setTimeout(() => {
              /** spinner ends after 5 seconds */
              this.spinner.hide();
            }, 5000);
            this.spinner.show();
            this.toastr.success('Successfully Submitted');
            this.submitted = false;
            this.targetName = this.editTargetForm.controls['targetName'].value;
            this.messageEvent.emit(this.targetName.trim());

            this.editTargetForm.controls['targetName'].reset();
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
      this.rowData = value.stores;
    });
  }
  addStoreEdit() {
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
        const list =  this.storeIdValue.split(',');
        for(let i=0; i<list.length;i++){
          previous.push(this.listaddedit(list[i]));
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

  listaddedit(id){
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

  onBtnClick2(data) {
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

  showEditTarget() {
    $('#app-edit-target-overlay').modal('show');
  }
  deleteTarget($event) {
    let selectedData = this.gridOptions.getSelectedRows();
    let rowData = this.gridOptions.applyTransaction({ remove: selectedData });
  }

  onCloseClick() {
    this.editTargetForm.reset();
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
    $('#app-edit-target-overlay').modal('hide');
  }
  onAddStore() {}

  showDeleteTarget() {
    $('#app-delete').modal('show');
  }
  deleteProceed() {
    this.targetService
      .deleteTargetData(this.data.editTargetId)
      .subscribe((success) => {
        $('#app-delete').modal('hide');
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 5000);
        this.spinner.show();
        this.toastr.success('Successfully deleted');
        this.messageEvent.emit('');
        this.editTargetForm.reset();
        $('#app-edit-target-overlay').modal('hide');
      });
  }
}
