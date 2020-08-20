import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Router,ActivatedRoute } from '@angular/router';
import{  MonitorService} from '../monitor.service'

@Component( {
  selector: 'app-grid-button',
  template: `<button type="button"class=".btn-primary"
  style="border: 1px solid transparent;
 padding: .375rem .75rem;
 font-size: .9375rem;
 border-radius: .25rem; color: #fff;
 background-color: #004db4 ;
 border-color: #1861ac; height: 24px; line-height: 12px;"
  (click)="onClick($event)">View</button>
  `
})

export class GridButtonComponent implements ICellRendererAngularComp {
  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        //refresh: this.params.rowData
        // ...something
      }
      this.params.onClick(params);

    }
  }
}