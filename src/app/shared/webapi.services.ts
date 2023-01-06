import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WebapiService {
  serviceUrl = environment.serviceUrl;
  public saveProduces: any = undefined;
  constructor(
    public Http: HttpClient,
    public CF: CommonService,
  ) {

  }

  public Token(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.serviceUrl}/Token`;
        const body = {
          // "username": "Sympl",
          // "password": "Sympl159"
          "username": "turtlemint_demo",
          "password": "Y7#n$Pn"
        }
        return this.Http.post<any>(url, body)
          .pipe(
            map(d => (d.code === 1) ? d.document.accessToken : false))
          .subscribe((r: any) => resolve(r), reject);
      }).catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  // public Login(data: any) {
  //   const url = `${this.serviceUrl}/Clients/filter?andOr=AND&page=1&itemsPerPage=100`;
  //   const body = [{
  //     "columnName": "client_email",
  //     "columnValue": data.Email
  //   },
  //   {
  //     "columnName": "client_password",
  //     "columnValue": data.Password
  //   }];

  //   return this.Http.post<any>(url, body).pipe(
  //     map(d => (d.code === 1) ? d.document.records : 'failed'))

  // }


  public async Login(body: any): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.serviceUrl}/Ezee_Users/filter?andOr=AND&page=1&itemsPerPage=1000`;
        return this.Http.post<any>(url, body).pipe(
          map((d: any) => (d) ? d : false)
        ).subscribe((r: any) => resolve(r), reject);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
