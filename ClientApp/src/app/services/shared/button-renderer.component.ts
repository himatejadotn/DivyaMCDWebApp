import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router,ActivatedRoute } from '@angular/router';
import{   MonitorService} from '../monitor.service'
import { ICellRendererParams, IAfterGuiAttachedParams } from 'ag-grid-community';
@Component( {
  selector: 'app-button-renderer',
  template: `<i class="fa fa-times" (click)="onClick($event)"></i>`
  
} )

export class ButtonRendererComponent implements ICellRendererAngularComp {
  constructor( private activatedRoute:ActivatedRoute, private router: Router,private MonitorService:MonitorService){}

  params;
  label: string;
 public id=2;


  agInit ( params ): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  

  refresh ( params?: any ): boolean {
    return true;
  }

  onClick ( $event ) {
    if ( this.params.onClick instanceof Function ) {
      // Put anything into params you want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data
        // ...something
      };
      this.params.onClick( params );
    }
  }
  deleterow(){}
}
