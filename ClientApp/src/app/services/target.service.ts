import { Injectable, Component ,EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreList, Stores } from '../components/create-target-overlay/Stores';
import { environmentAPIPaths } from 'src/environments/environmentAPIPaths';
import { SaveTargetData } from '../components/create-target-overlay/saveTargetData';
import { EditTargetData } from '../components/edit-target-overlay/editTargetData';
import { GlobalConstants } from '../shared/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  public id;
  @Output() targetidChanged : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onDeleteTarget : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onEditTarget : EventEmitter<boolean> = new EventEmitter<boolean>();
  private baseUrl =environment.baseUrl;
  //private apiGatewayStoreUrl = environmentAPIPaths.apiGatewayTargetStores;
  private apiGatewaySaveTargetUrl =environmentAPIPaths.apiGatewaySaveTarget;
  private apiGatewaydeleteTargetUrl =environmentAPIPaths.apiGatewayDeleteTarget;
  private apiGatewayaddStoresUrl =environmentAPIPaths.apiGatewayaddStores;
  private apiGatewayeditTargetUrl =environmentAPIPaths.apiGatewayeditTarget;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Authorization'
    })
  };
constructor(private http:HttpClient) { }

getFilters():Observable<Stores> {
  //apiGatewayTargetStores: '/api/v1/markets/'+GlobalConstants.market+'/stores',
  return this.http.get<Stores>(this.baseUrl +environmentAPIPaths.apiGatewayBaseMarketUrl+ +GlobalConstants.market+'/stores');  
}

SaveCreateTarget(data:any):Observable<SaveTargetData>{
     return this.http.post<SaveTargetData>(this.baseUrl+this.apiGatewaySaveTargetUrl,data,this.httpOptions,);
}
deleteTargetData(id):Observable<EditTargetData>{
  return this.http.delete<EditTargetData>(this.baseUrl+ this.apiGatewaydeleteTargetUrl+id, this.httpOptions);
}

addStores(id:string){
  return this.http.get(this.baseUrl+ this.apiGatewayaddStoresUrl+id+"&region=&allDayStoreType=&ownerOperator=/addstores?market="+GlobalConstants.market);
}

editTarget(id){
  return this.http.get(this.baseUrl+ this.apiGatewayeditTargetUrl+id+"?market="+GlobalConstants.market);

}
// handleError(handleError: any): import("rxjs").OperatorFunction<saveData, any> {
//    throw new Error("Method not implemented.");
// }
}
