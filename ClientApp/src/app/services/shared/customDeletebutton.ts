import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component( {
  selector: 'app-button-renderer',
  template: `
  <span><i class="fa fa-trash" aria-hidden="true"></i></span>'
    `
} )

export class CustomDeleteComponent implements ICellRendererAngularComp {

  params;
  label: string;

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
}
