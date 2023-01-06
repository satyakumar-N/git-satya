import { LayoutContainersModule } from './../../module/layout/layout.containers.module';
import { HeadingComponent } from './../../module/layout/heading/heading.component';
import { FooterComponent } from './../../module/layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyComponent } from './body.component';


@NgModule({
  declarations: [BodyComponent],
  imports: [
    CommonModule,
    LayoutContainersModule
  ]
})
export class BodyModule { }
