import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobcreationComponent } from './jobcreation.component';
import { jobcreationService } from './jobcreation.service';

const routes: Routes = [{ path: '', component: JobcreationComponent, resolve: { insp_serv: jobcreationService } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobcreationRoutingModule { }
