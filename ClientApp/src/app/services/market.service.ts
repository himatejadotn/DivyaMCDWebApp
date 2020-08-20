import { Injectable, Output, EventEmitter } from '@angular/core';
import { Market } from '../components/create-deployment/market';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})

export class MarketService {
    public name;
    @Output() marketChanged : EventEmitter<boolean> = new EventEmitter<boolean>();
    
    private apiGatewayBaseURL = environment.apiGatewayBaseURL;
    private apiGatewayMarkets = environment.apiGatewayMarkets;
    constructor(private http:HttpClient) { }

    // getMarkets():Observable<Market> {
    //    return this.http.get<Market>(this.marketUrl);
     
    // }
    getMarkets(): Array<Market> {
        return [
            {shortName: 'WW', longName: 'WW', storeCount: 1000, maxStoresPerDeployment: 50},
            {shortName: 'AU', longName: 'Australia', storeCount: 14000, maxStoresPerDeployment:200},
            {shortName: 'US', longName: 'US', storeCount: 14000, maxStoresPerDeployment:200}
        ];
    }

}