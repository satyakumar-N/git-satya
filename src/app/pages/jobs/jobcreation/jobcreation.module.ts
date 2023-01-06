import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobcreationRoutingModule } from './jobcreation-routing.module';
import { JobcreationComponent } from './jobcreation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [JobcreationComponent],
  imports: [
    CommonModule,
    JobcreationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
    ModalModule.forRoot(),
    AngularMultiSelectModule,
    TabsModule.forRoot(),
    NgSelectModule,
  ]
})
export class JobcreationModule { }
