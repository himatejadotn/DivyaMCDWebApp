import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../services/monitor.service';
import { Monitor } from '../monitoring/monitor';
import { ButtonRendererComponent } from 'src/app/services/shared/button-renderer.component';
import * as moment from 'moment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Module } from '@ag-grid-community/all-modules';
import { DeploynmentDetails } from './deploynmentdetails'
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import{ActivatedRoute, Router} from '@angular/router' 
declare var $: any;

@Component({
  selector: 'app-deploymentdetails',
  templateUrl: './deploymentdetails.component.html',
  styleUrls: ['./deploymentdetails.component.css'],
})
export class DeploymentdetailsComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = [ClientSideRowModelModule];
  columnDefs;
  defaultColDef;
  targetStores = [];
  deploynmentDetail=[{
    deploymentId:"string",
    deploymentName: "string",
    effectiveDate: "string",
    status: "string",
    release: "string",
    comments:"string"
  }];
  rowHeight;
  gridOptions: object;
  //storeList: StoreList[];
  paginationPageSize: number;
  public paginationNumberFormatter;
  public getRowHeight;
  gridData: object;
  constructor( private router: Router,private MonitorService: MonitorService,private Route:ActivatedRoute, private DataService:DataService,private spinner: NgxSpinnerService, public toastr: ToastrService) {
    this.columnDefs = [
      {
        headerName: 'storeId',
        field: 'storeId',
        sortable: true,
        lockPosition: true,
        width: 170,
      },

      {
        headerName: 'Status',
        field: 'status',
        width: 190,
        sortable: true,
        lockPosition: true,
      },

      {
        headerName: '',
        lockPosition: true,
        field: 'imageUrl',
        cellClass: 'no-border',
        width: 120,
        cellRenderer : function(params){
          return '<div ><button class="buttoncls" (click)="delete($event)">View</button></div>'
      }
            },

      {
        headerName: '',
        lockPosition: true,
        field: 'imageUrl',
        cellClass: 'no-border',
        width: 120,
        cellRenderer : function(params){
          return '<div ><button class="buttoncls">Delete</button></div>'
      }
            }      
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
    this.gridOptions = {
      headerHeight: 60,
      rowHeight: 100,
      pagination: true,
      paginationPageSize: 50,
    };
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  ngOnInit(): void {
     let id = parseInt(this.Route.snapshot.paramMap.get('id'))
    this.MonitorService.getDeploynmentDetailsData(id).subscribe((data)=>{
      console.log(this.deploynmentDetail['cancel'] =data['cancel']);
      this.deploynmentDetail['cancel'] =data['cancel'];
     this.deploynmentDetail['deploymentName'] =data['deploymentName'];
     this.deploynmentDetail['deploymentId'] =data['deploymentId'];
     this.deploynmentDetail['effectiveDate'] =data['effectiveDate'];
     this.deploynmentDetail['status'] =data['status'];
     this.deploynmentDetail['release'] =data['release'];
     this.deploynmentDetail['comments'] =data['comments'];
     this.gridData=data['targetStores'][0];
        this.gridData[0];
        console.log(data['deploymentId']);
        console.log( this.deploynmentDetail['deploymentId']);
  });

  
  }
    
  


//   getDeploynmentDetailsData(){
//    const gridData =
//    this.MonitorService.getDeploynmentDetailsData(this.MonitorService.id).subscribe((data)=>{
   
// //     console.log( this.gridData);

//   })
// }
  
  
  onQuickFilterChanged() {
    var inputValue = (<HTMLInputElement>document.getElementById('quickFilter'))
      .value;
    this.gridApi.setQuickFilter(inputValue);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }



  cancelDeploynment() {
    $('#app-cancel').modal('show');
  }
  Canceldeploynmentsstatus() {
    this.MonitorService.CancelDeploynments(this.deploynmentDetail['deploymentId']).subscribe((success) => {
      $('#app-cancel').modal('hide');
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 5000);
      this.spinner.show();
      this.toastr.success('Successfully Canceled');
      this.router.navigate(['/monitoring']);
     // this.createTargetForm.reset();

    });
  }
  // getDeploynmentDetailsData() {
  //   this.MonitorService.getDeploynmentDetailsData().subscribe((data) => {
  //     this.rowData = data;
  //     this.rowData.forEach(
  //       (items) =>
  //         (items.effectiveDate = moment(items.effectiveDate).format(
  //           'YYYY/MM/DD'
  //         ))
  //     );
  //   });
  // }
}
