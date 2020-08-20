import { Routes } from '@angular/router';
import{CreateTargetOverlayComponent} from './components/create-target-overlay/create-target-overlay.component'
import { CreateDeploymentComponent } from './components/create-deployment/create-deployment.component';
import { CreateDeploymentStepTwoComponent } from './components/create-deployment-step-two/create-deployment-step-two.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { DeploymentdetailsComponent } from './components/deploymentdetails/deploymentdetails.component';
import { from } from 'rxjs';
export const appRoutes: Routes = [

  {path:'createdeployment', component: CreateDeploymentComponent},
 {path:'deploynmentdetails/:id', component: DeploymentdetailsComponent},
  {path:'createDeploymentStepTwo',component:CreateDeploymentStepTwoComponent},
  {path:'monitoring',component:MonitoringComponent},
  {path:'editTarget/:id',component:CreateTargetOverlayComponent},
  {path: 'access-denied', component: AccessDeniedComponent},
  {path: '', redirectTo: '/monitoring', pathMatch: 'full'},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];
