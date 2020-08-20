import { Injectable, Component ,EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { software, components } from '../components/add-release-overlay/software';
import {  ReleaseData } from '../components/add-release-overlay/releaseData';
import { version, versionData } from '../components/add-release-overlay/version';
import { saveData } from '../components/add-release-overlay/SaveData';
import { catchError } from 'rxjs/operators';
import { Data } from '@angular/router';
import { EditData } from '../components/edit-release-overlay/editData';
import { status } from 'src/app/components/add-release-overlay/status'
import { environmentAPIPaths } from 'src/environments/environmentAPIPaths';
import { GlobalConstants } from '../shared/GlobalConstants';
@Injectable({
    providedIn: 'root',
})

export class EditReleaseService {
    public id;
    @Output() idChanged : EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onEditRelease : EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onCreateRelease : EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() onDeleteRelease : EventEmitter<boolean> = new EventEmitter<boolean>();
 //private EditReleaseUrl='https://app-deployment-dev-001.azurewebsites.net/api/v1/releases/';
 //private updateReleaseData=`https://app-deployment-dev-001.azurewebsites.net/api/v1/releases/`;
    // private deleteUrl=`https://app-deployment-dev-001.azurewebsites.net/api/v1/releases/`;
    private baseUrl =environment.baseUrl;
    private apiGatewayDeploymentBaseURL= environment.apiGatewayDeploymentBaseURL;
    private apiGatewayBaseURL = environment.apiGatewayBaseURL;
    //private apiGatewayversionUrl = environment.apiGatewayversionUrl;
    //apiGatewayversionUrl:`/api/v1/releases/`+GlobalConstants.market+`/components/`,
    //private apiGatewaysoftwareURL = environment.apiGatewaysoftwareURL;
    private apiGatewayReleaseRowUrl = environment.apiGatewayReleaseRowUrl;
    //private apiGatewayreleasestatus=environment.apiGatewayreleasestatus;
    //private apiGatewayEditReleaseUrl=environment.apiGatewayEditReleaseUrl;
    //private apiGatewaySaveReleaseUrl = environment.apiGatewaySaveReleaseUrl;
    private apiGatewayReleasedelete = environment.apiGatewayReleasedelete;
    private apiGatewayReleaseedit = environment.apiGatewayReleaseedit;
    private apiGatewayReleaseupdate = environment.apiGatewayReleaseupdate; 
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Authorization'
        })
      };
    constructor(private http:HttpClient) { }
    // getEditRelease(id :number):Observable<EditData>{       
    //     return this.http.get<EditData>(this.EditReleaseUrl+id);
    // }
    // UpdateReleaseData(id,data):Observable<EditData>{
    //     return this.http.put<EditData>(this.updateReleaseData+id,data,this.httpOptions);
    // }
    getSoftware():Observable<components> {
       return this.http.get<components>(this.apiGatewayDeploymentBaseURL+environmentAPIPaths.apiGatewayReleaseBaseUrl+GlobalConstants.market+`/components`);  
    }
    getVersion():Observable<versionData>{
         //apiGatewayversionUrl:`/api/v1/releases/`+GlobalConstants.market+`/components/`,
        return this.http.get<versionData>(this.apiGatewayDeploymentBaseURL+environmentAPIPaths.apiGatewayReleaseBaseUrl+GlobalConstants.market+`/components/`);
    }
    getReleaseStatus():Observable<status>{
        return this.http.get<status>(this.apiGatewayDeploymentBaseURL+ environmentAPIPaths.apiGatewayReleaseBaseUrl + GlobalConstants.market + '/releasestatus');
    }

    deleteReleaseData(id):Observable<EditData>{
        return this.http.delete<EditData>(this.baseUrl+this.apiGatewayReleasedelete+id,this.httpOptions);
    }
    getEditRelease(id :number):Observable<EditData>{       
        return this.http.get<EditData>(this.baseUrl+this.apiGatewayReleaseedit+id,this.httpOptions);
    }
    UpdateReleaseData(id,data):Observable<EditData>{
        return this.http.put<EditData>(this.baseUrl+this.apiGatewayReleaseupdate+id,data,this.httpOptions);
    }
   
}