import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../module/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UnauthorizedComponent } from '../module/unauthorized/unauthorized.component';
@NgModule({
  declarations: [ErrorComponent, UnauthorizedComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
  ],
  exports: [
    PerfectScrollbarModule,
    RouterModule,
    ErrorComponent,
    UnauthorizedComponent,
    TranslateModule,
    CommonModule,
  ],
})
export class SharedModule { }
