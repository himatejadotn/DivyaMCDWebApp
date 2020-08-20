import { Component, OnInit } from '@angular/core';
import { MonitorService } from '../../services/monitor.service'
import { Monitor } from '../monitoring/monitor';
import { ButtonRendererComponent } from 'src/app/services/shared/button-renderer.component';
import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Module } from '@ag-grid-community/all-modules';
import { GridButtonComponent } from 'src/app/services/shared/grid-button.component';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recent-release',
  templateUrl: './recent-release.component.html',
  styleUrls: ['./recent-release.component.css']
})
export class RecentReleaseComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public modules: Module[] = [ClientSideRowModelModule];
  columnDefs;
  defaultColDef;
  rowData = [];
  rowHeight;
  gridOptions: object;
  paginationPageSize: number;
  public paginationNumberFormatter;
  private getRowHeight;
  rowDataClicked1 = {};
  rowDataClicked2 = {};
  frameworkComponents: { buttonRenderer: typeof GridButtonComponent; };

  constructor(private MonitorService: MonitorService,private activatedRoute:ActivatedRoute, private router: Router)
  {
    this.frameworkComponents = {
      buttonRenderer: GridButtonComponent,
    }
    
    this.getRowHeight = function (params) {
      return params.data.rowHeight;
    };
    this.columnDefs = [
      {
        headerName: 'Deployment ID',
        field: 'deploymentID',
        sortable: true,
        width: 170,
        lockPosition: true,
      },
      {
        headerName: 'Deployment Name',
        field: 'deploymentName',
        width: 220,
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
        lockPosition: true,
        sortable: true,
      },
      {
        headerName: 'Release',
        field: 'release',
        width: 130,
        lockPosition: true,
        sortable: true,
      },
      {
        headerName: 'Created By',
        width: 150,
        field: 'createdBy',
        sortable: true,
        lockPosition: true,
      },
      {
        headerName: '',
        field: 'imageUrl',
        lockPosition: true,
        width: 120,
        cellClass: 'no-border',
       // cellRendererFramework: ButtonRendererComponent,
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
    };
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return '[' + params.value.toLocaleString() + ']';
    };
  }

  ngOnInit(): void {
    this.getMonitorData();
    console.log(this.getMonitorData);
  }
  // drop(){
  //   alert("hello is how are you");
  // }

  onBtnClick1(data){ 
    //     console.log(id['rowData']['deploymentID']);
         const id= data['rowData']['deploymentID'];
         this.router.navigate(['/deploynmentdetails', id]);
    
        }

  onQuickFilterChanged() {
    var inputValue = (<HTMLInputElement>document.getElementById('quickFilter')).value;
    this.gridApi.setQuickFilter(inputValue);
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.getMonitorData();
  }
  getMonitorData() {
    this.MonitorService.getRecentData().subscribe(data => {
      this.rowData = data;
      this.rowData.forEach((items) => items.effectiveDate = moment(items.effectiveDate).format('YYYY/MM/DD'));
    })
  }
}
