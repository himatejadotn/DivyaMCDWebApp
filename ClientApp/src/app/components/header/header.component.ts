import { Component, OnInit } from '@angular/core';
import { MarketService } from '../../services/market.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Market } from '../create-deployment/market';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  headerFormGroup: FormGroup;
  markets: Array<Market>;
  selectedMarket: string;
  data: any;

  constructor(private marketService: MarketService, public router: Router) { }

  ngOnInit(): void {
    this.headerFormGroup = new FormGroup({
      market: new FormControl()
    });

    this.markets = this.marketService.getMarkets();

    this.marketService.marketChanged.subscribe((event: boolean) => {
      debugger;
      if (event) {
        GlobalConstants.market = this.marketService.name;
        if(GlobalConstants.selectedModule=="MonitoringComponent"){
           this.router.navigateByUrl('/monitoring', { skipLocationChange: false }).then(() => {
            this.router.navigate(['monitoring']);
         }); 
        }
        else if(GlobalConstants.selectedModule=="CreateDeploymentComponent"){
          this.router.navigateByUrl('/createdeployment', { skipLocationChange: true }).then(() => {
            this.router.navigate(['createdeployment']);
         }); 
        }
      }
    });
  }

  onChangeMarket($event) {
    this.marketService.name = $event.target.value;
    this.marketService.marketChanged.emit(true);
  }
}
