import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDeploymentComponent } from './components/create-deployment/create-deployment.component';
import { appRoutes } from './app-routes';
import { RouterModule } from '@angular/router';
import { CreateDeploymentStepTwoComponent } from './components/create-deployment-step-two/create-deployment-step-two.component';
import { AgGridModule } from 'ag-grid-angular';
import { HeaderComponent } from './components/header/header.component';
import { MonitoringComponent } from './components/monitoring/monitoring.component';
import { EditReleaseOverlayComponent } from './components/edit-release-overlay/edit-release-overlay.component';
import { SharedModule } from './services/shared/shared.module';
import { AddReleaseOverlayComponent } from './components/add-release-overlay/add-release-overlay.component';
import { UpcomingReleaseComponent } from './components/upcoming-release/upcoming-release.component';
import { RecentReleaseComponent } from './components/recent-release/recent-release.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './services/shared/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './services/shared/confirmation-dialog/confirmation-dialog.service';
import { CreateTargetOverlayComponent } from './components/create-target-overlay/create-target-overlay.component';
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
// Datepicker module
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { DeploymentdetailsComponent } from './components/deploymentdetails/deploymentdetails.component';
import { EditTargetOverlayComponent } from './components/edit-target-overlay/edit-target-overlay.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateDeploymentComponent,
    CreateDeploymentStepTwoComponent,
    HeaderComponent,
    MonitoringComponent,
    EditReleaseOverlayComponent,
    AddReleaseOverlayComponent,
    UpcomingReleaseComponent,
    RecentReleaseComponent,
    CreateTargetOverlayComponent,
    AccessDeniedComponent,
    DeploymentdetailsComponent,
    EditTargetOverlayComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    AgGridModule.withComponents([])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }, ConfirmationDialogService, NgbActiveModal,],
  entryComponents: [ConfirmationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
