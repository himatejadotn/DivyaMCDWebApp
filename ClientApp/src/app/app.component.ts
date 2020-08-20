import { Component } from '@angular/core';
import { DataService } from "./services/data.service";
import { GlobalConstants } from './shared/GlobalConstants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Deployment-Console';
  
  routerOutletComponent: object;
  routerOutletComponentClassName: string;

  onActivate(event: any): void {
    this.routerOutletComponent = event;
    this.routerOutletComponentClassName = event.constructor.name;
    GlobalConstants.selectedModule=event.constructor.name;
  }
}
