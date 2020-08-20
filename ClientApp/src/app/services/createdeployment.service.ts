import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Monitor } from '../components/monitoring/monitor';
import { Market } from '../components/create-deployment/market';
import { Target } from '@angular/compiler';
import { Release } from '../components/create-deployment/release';
import { targetCount } from '../components/create-deployment/targetcount';
import { environment } from 'src/environments/environment';
import { MultipleDeployments } from '../components/create-deployment-step-two/mulitple-deployments';
import { Deployment } from '../components/create-deployment/deployment';
import { Targets } from '../components/create-deployment/target';
import { environmentAPIPaths } from 'src/environments/environmentAPIPaths';
import { GlobalConstants } from '../shared/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class CreateDeploymentService {

  private apiGatewayDeploymentBaseURL = environment.apiGatewayDeploymentBaseURL;
  private apiGatewaytargetCount = environment.apiGatewaytargetCount;
  private apiGatewayMultipleDeploymentUrl = environment.apiGatewayMultipleDeploymentUrl;
  private apiGatewaySaveDeploymentUrl = environment.apiGatewaySaveDeploymentUrl;

//Temporary
  //apiGatewayreleaseUrl :'/api/v1/markets/'+GlobalConstants.market+'/releases',
 // apiGatewayGetTargetList:'/api/v1/'+GlobalConstants.market+'/targets',
//Temporary

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Authorization'
    })
  };

  idChange: number = null;
  targets: Target[];

  static idChange: BehaviorSubject<any> = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) { }

  getRelease(market: Market): Observable<Release[]> {
    return this.http.get<Release[]>(this.apiGatewayDeploymentBaseURL + environmentAPIPaths.apiGatewayBaseMarketUrl+GlobalConstants.market+'/releases');
  }
  getTargetName(market: string): Observable<Targets[]> {
    //apiGatewayGetTargetList:'/api/v1/'+GlobalConstants.market+'/targets',
    return this.http.get<Targets[]>(this.apiGatewayDeploymentBaseURL + environmentAPIPaths.apiGatewayBase+GlobalConstants.market+'/targets');
  }
  getTargetCount(market: string, targetName: string): Observable<targetCount> {
    return this.http.get<targetCount>(this.apiGatewayDeploymentBaseURL + this.apiGatewaytargetCount + market + `/targetcount/` + targetName);
  }
  getNumberOfRows(targetStoreCount: number, storeCount: number): Observable<MultipleDeployments[]> {
    return this.http.get<MultipleDeployments[]>(this.apiGatewayDeploymentBaseURL + this.apiGatewayMultipleDeploymentUrl + `?TargetStoreCount=` + targetStoreCount + `&StoreLimit=` + storeCount);
  }
  SaveDeployment(data: any): Observable<Deployment> {
    return this.http.post<Deployment>(this.apiGatewayDeploymentBaseURL + this.apiGatewaySaveDeploymentUrl, data, this.httpOptions,);
  }
}
