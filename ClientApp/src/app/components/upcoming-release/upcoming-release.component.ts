import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../services/monitor.service'
import { Monitor} from '../monitoring/monitor';
import { ButtonRendererComponent } from 'src/app/services/shared/button-renderer.component';
import * as moment from 'moment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Module } from '@ag-grid-community/all-modules';
import { GridButtonComponent } from 'src/app/services/shared/grid-button.component';
import { Router,ActivatedRoute } from '@angular/router';
import { DeploynmentDetails } from '../deploymentdetails/deploynmentdetails';

@Component({
  selector: 'app-upcoming-release',
  templateUrl: './upcoming-release.component.html',
  styleUrls: ['./upcoming-release.component.css']
})
export class UpcomingReleaseComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = [ClientSideRowModelModule];
   columnDefs;
   defaultColDef;
   deploymentID:number;
  rowData = [];
  rowHeight;
  gridOptions: object;
  paginationPageSize: number;
  public paginationNumberFormatter;
  public getRowHeight;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  //public selectedRowData: DeploynmentDetails;
  frameworkComponents: { buttonRenderer: typeof GridButtonComponent; };
  constructor(private MonitorService:MonitorService,private activatedRoute:ActivatedRoute, private router: Router,)
  
  {
     this.frameworkComponents = {
      buttonRenderer: GridButtonComponent,
    }
    
    this.columnDefs = [
      {
        headerName: 'Deployment ID',
         field: 'deploymentID',
         sortable: true, 
         lockPosition: true,
         width: 170,
         },
      {
        headerName: 'Deployment Name',
         field: 'deploymentName',
         width:220,
         sortable: true, 
         lockPosition: true,
         },
      {
        headerName: 'Effective Date',
         field: 'effectiveDate',
         sortable: true, 
         lockPosition: true,
        },
      {
        headerName: 'Status', 
        field: 'status',
        width: 190,
        sortable: true,
        lockPosition: true,
        },
      {
        headerName: 'Release',
        width:130, 
        field: 'release',
        lockPosition: true,
        sortable: true, 
      },
      {
        headerName: 'Created By',
         field: 'createdBy',
         width:150,
         sortable: true, 
         lockPosition: true,
        },
      {
        headerName: '',
        lockPosition: true,
        field: 'imageUrl',
        cellClass: 'no-border',
        width: 120,
        //cellRendererFramework: ButtonRendererComponent,
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: 'Click 1'
        }
      },
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
    this.paginationNumberFormatter = function(params) {
      return '[' + params.value.toLocaleString() + ']';
    };
   }
  
  ngOnInit(): void {
    this.getUpcomingData();
  }
  onQuickFilterChanged() {
    var inputValue = (<HTMLInputElement>document.getElementById('quickFilter')).value;
     this.gridApi.setQuickFilter(inputValue);
    }
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }

    onBtnClick1(data){ 
//     console.log(id['rowData']['deploymentID']);
     const id= data['rowData']['deploymentID'];
     this.router.navigate(['/deploynmentdetails', id]);

    }
  getUpcomingData(){
    this.MonitorService.getUpcomingData().subscribe(data=>{
      this.rowData=data;
      this.rowData.forEach((items)=>items.effectiveDate=moment(items.effectiveDate).format('YYYY/MM/DD'));
    });
  }
}
