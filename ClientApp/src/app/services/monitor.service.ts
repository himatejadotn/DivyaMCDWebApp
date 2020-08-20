import { Injectable,EventEmitter, Output } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Monitor} from '../components/monitoring/monitor';
import { environment } from 'src/environments/environment';
import { DeploynmentDetails } from '../components/deploymentdetails/deploynmentdetails';
import { environmentAPIPaths } from 'src/environments/environmentAPIPaths';
import { GlobalConstants } from '../shared/GlobalConstants';
@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  public id;
  @Output() idValue : EventEmitter<boolean> = new EventEmitter<boolean>();
  
  private apiGatewayBaseURL = environment.apiGatewayBaseURL;
 
 //private apiGatewaydeploynmentdetails = environment.apiGatewaydeploynmentdetails;
  //apiGatewaydeploynmentdetails: '/api/v1/monitoring/WW/deployments/',
  private apiGatewaycanceldeploynment = environment.apiGatewaycanceldeploynment;

  private apiGatewayDeploymentBaseURL = environment.apiGatewayDeploymentBaseURL
  constructor(private http:HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Authorization'
    })
  };

  getRecentData(): Observable<Monitor[]> {
    return this.http.get<Monitor[]>(this.apiGatewayBaseURL +environmentAPIPaths.apiGatewayMonitor+GlobalConstants.market+'/recentdeployment')
  }
  getUpcomingData(){
    return this.http.get<Monitor[]>(this.apiGatewayBaseURL +environmentAPIPaths.apiGatewayMonitor+GlobalConstants.market+'/upcomingdeployment')
  }
  getDeploynmentDetailsData(id){
    //return this.http.get<DeploynmentDetails[]>(this.apiGatewayBaseURL + this.apiGatewaydeploynmentdetails +id)
    return this.http.get<DeploynmentDetails[]>(this.apiGatewayBaseURL + environmentAPIPaths.apiGatewayMonitor + GlobalConstants.market + '/deployments/' + id)
  }
  CancelDeploynments(id):Observable<Monitor[]>{
    //apiGatewaycanceldeploynments:'/api/v1/deployments/cancel?marketName='+GlobalConstants.market+'&deploymentId='
    return this.http.patch<Monitor[]>(this.apiGatewayDeploymentBaseURL + environmentAPIPaths.apiGatewaycanceldeploynments + GlobalConstants.market + '&deploymentId=' + id, this.httpOptions)
  }
}
