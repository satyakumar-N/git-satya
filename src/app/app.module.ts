import { BodyComponent } from './module/body/body.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { LayoutContainersModule } from './module/layout/layout.containers.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HeadroomModule } from '@ctrl/ngx-headroom';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { TokenInterceptorService } from './shared/interceptor'

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true
    }),
    SharedModule,
    TabsModule.forRoot(),
    HeadroomModule,
    ScrollToModule.forRoot(),

  ],
  declarations: [
    AppComponent,
    BodyComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
