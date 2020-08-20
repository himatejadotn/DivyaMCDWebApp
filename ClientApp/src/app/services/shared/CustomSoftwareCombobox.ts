import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {AddReleaseService} from 'src/app/services/addreleaseservice'
import { ReleaseData } from 'src/app/components/add-release-overlay/releaseData';

@Component( {
  selector: 'app-button-renderer',
  template: `
  <select style="height:20px; width: 170px;" >
  <option>{{value}}</option>
  </select>
    `
} )

export class CustomSoftwareCombobox implements ICellRendererAngularComp {
  private items: any[];
  selectedresult: any;
  softwareList: string[];
  resultList=[];
  deployementModelList : string[];
  values: any;
  constructor(private AddReleaseService:AddReleaseService) {
    
    this.values=[]
} 
  params;
  label: string;
  value: any;
  options:any;
  rowData:ReleaseData[] = [];

  agInit ( params ): void {
    this.value = params.value;
    // this.params = params;
    //     this.value = params.value;
    //     this.options = params.options;
    //this.values=this.params.node.data
    // for(let d of params.data){
    //   var releaseData : ReleaseData = d.components[0];
    //   this.rowData.push(releaseData);
    //   this.rowData=this.rowData;
    // }
    //console.log(params);
    // this.AddReleaseService.getReleaseRowdata().subscribe((data)=>{
    //   console.log(data)
    //   // let releaseData: ReleaseData[] = data.components;
    //   // console.log(releaseData)
    //   // for(let rd of releaseData){
    //   //   this.rowData.push(rd)
    //   // }
    //   for(let d of data){
    //     var releaseData : ReleaseData = d.components[0];
    //     this.rowData.push(releaseData);
    //   }
    //   console.log(this.rowData);
    // })
    //console.log(this.params);
   // this.label = this.params.label || null;
  }
//   agInit(params: any): void {
//     if(this.items.length == 0) {
//         this.params = params;
//         this.http.post(url, params)
//         // this.http.get(url) // if the call is a GET
//             .subscribe(result => {
//                 this.items = result;
//                 this.selectedresult = _.find(this.items, item => item.label == params.result);
//             });
//     }
// }

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
