import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
// import {MultiSelectModule} from 'primeng/multiselect';

import {
    JQUERY_TOKEN,
} from './index';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ButtonRendererComponent } from './button-renderer.component';
import{ GridButtonComponent }  from './grid-button.component';
import { from } from 'rxjs';
const jQuery = window['$'];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AgGridModule
    ],
    declarations: [
    ConfirmationDialogComponent,ButtonRendererComponent,GridButtonComponent],
    exports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        AgGridModule,
    ],
    providers: [
        { provide: JQUERY_TOKEN, useValue: jQuery }
    ]
})

export class SharedModule {

}
