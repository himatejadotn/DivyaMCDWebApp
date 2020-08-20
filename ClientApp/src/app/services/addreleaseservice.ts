import { Injectable, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { software, components } from '../components/add-release-overlay/software';
import {  ReleaseData } from '../components/add-release-overlay/releaseData';
import { version, versionData } from '../components/add-release-overlay/version';
import { saveData } from '../components/add-release-overlay/SaveData';
import { catchError } from 'rxjs/operators';
import { Data } from '@angular/router';
import { status } from 'src/app/components/add-release-overlay/status'
import { CustomSoftwareCombobox } from './shared/CustomSoftwareCombobox';
import { environmentAPIPaths } from 'src/environments/environmentAPIPaths';
import { GlobalConstants } from '../shared/GlobalConstants';

@Injectable({
    providedIn: 'root',
})
 
export class AddReleaseService {
    private versionUrl=`https://app-deployment-dev-001.azurewebsites.net/api/v1/releases/US/components/`;
    private softwareURL ='http://app-deployment-dev-001.azurewebsites.net/api/v1/releases/WW/components';
    //private SaveReleaseUrl='http://app-deployment-dev-001.azurewebsites.net/swagger/index.html';
    private ReleaseRowUrl='http://app-deployment-dev-001.azurewebsites.net/api/v1/releases';
    private ReleseStatus='http://app-deployment-dev-001.azurewebsites.net/api/v1/releases/US/releasestatus';
    private baseUrl =environment.baseUrl;
    private apiGatewayDeploymentBaseURL= environment.apiGatewayDeploymentBaseURL;
    private apiGatewayBaseURL = environment.apiGatewayBaseURL;
    //private apiGatewayversionUrl = environment.apiGatewayversionUrl;
    //apiGatewayversionUrl:`/api/v1/releases/`+GlobalConstants.market+`/components/`,
   // private apiGatewaysoftwareURL = environment.apiGatewaysoftwareURL;
    private apiGatewayReleaseRowUrl = environment.apiGatewayReleaseRowUrl;
    //private apiGatewayreleasestatus=environment.apiGatewayreleasestatus;
    //apiGatewayreleasestatus:'/api/v1/releases/'+GlobalConstants.market+'/releasestatus',
    //private apiGatewaySaveReleaseUrl = environment.apiGatewaySaveReleaseUrl;
    
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
    constructor(private http:HttpClient) { }

    getSoftware():Observable<components> {
       return this.http.get<components>(this.apiGatewayDeploymentBaseURL+ environmentAPIPaths.apiGatewayReleaseBaseUrl+GlobalConstants.market+`/components/`);  
    }
    getVersion(software):Observable<versionData>{
        const version="/versions";
        return this.http.get<versionData>(this.apiGatewayDeploymentBaseURL+environmentAPIPaths.apiGatewayReleaseBaseUrl+GlobalConstants.market+`/components/`+software +version);
    }
    getReleaseStatus():Observable<status>{
        //apiGatewayreleasestatus:'/api/v1/releases/'+GlobalConstants.market+'/releasestatus',
        return this.http.get<status>(this.apiGatewayDeploymentBaseURL + environmentAPIPaths.apiGatewayReleaseBaseUrl + GlobalConstants.market + '/releasestatus');
    }
    setcreaterRelease(data:any):Observable<saveData>{
          return this.http.post<saveData>(this.apiGatewayDeploymentBaseURL+this.apiGatewayReleaseRowUrl,data,this.httpOptions,);
    }
}
