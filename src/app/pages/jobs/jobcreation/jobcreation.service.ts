
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { map } from "rxjs/operators";
import { CommonService } from "src/app/shared/common.service";
import { WebapiService } from "src/app/shared/webapi.services";
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: "root" })
export class jobcreationService {
  User_details: any;
  constructor(
    public CF: CommonService,
    private Service: WebapiService
  ) {
    this.User_details=JSON.parse(localStorage.getItem("User_details"));
  }
  resolve(route: ActivatedRouteSnapshot) {
    return;
  }
  public async add_Job(data: any): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.Service.serviceUrl}/Ezee_Reasons_Rejections`;
        const body = {
          "sno": 0,
          "client_id":0,
          "rejection_id": "string",
          "template_id": 0,
          "field_id":0,
          "reason_id": 0,
          "reason": "string",
          "status": 10,
          "remarks": "string",
          "user_id": this.User_details.user_id,
          "transdate": "2021-12-26T03:39:14.653Z",
          "jsondata": "string",
          "emailJSON": "string",
          "aI_status": 0,
          "original_Appl_ID": '',
          "insp_status": 0,
          "company_Job_ID":data.Jobid?data.Jobid.toString():"",
          "userName":data.fullname.toString().trim(),
          "mobileNo":data.phonenumber.toString(),
          "link": "string",
          "emailID":data.email,
          "job_Id":data.Jobid.toString(),
          "recommendations": false,
          "tC_Date":new Date(),
          "job_creation_Date":new Date(),
          "linkhash": "string",
          "branch_Code": data.branchcode,
          "vehicle_Catagory": data.vehicle_type,
          "company_ID": data.company_type
          }
        return this.Service.Http.post<any>(url, body).pipe(
          map((d: any) => (d.code === 1 ? d : false))
        )
          .subscribe((r: any) => resolve(r), reject);

      });
    } catch (error) {
      console.log(error);
    }
  }

  public async filter(body): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `${this.Service.serviceUrl}/Ezee_Reasons_Rejections/filter?andOr=AND&page=1&itemsPerPage=100`;
        return this.Service.Http
          .post<any>(url,body).pipe(
            map((d: any) => (d.code === 1 ? d.document.records : false)))
          .subscribe((r: any) => resolve(r), reject);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async link_comp(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = `https://cutt.ly/api/api.php?key=40a5f26e7664b0f0cbddf34fb944aed452ec3&short=https%3A%2F%2Findia.symplfy.com%2Flinkcheck%3Flinkcode%3D345345&name=&userDomain=0`;

        // const headers = new HttpHeaders();
        // headers.append('Access-Control-Allow-Origin', '*');
        // headers.append("Content-type","application/x-www-form-urlencoded");

        const headerDict = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Headers': 'Content-Type',

        }

        const requestOptions = {
          headers: new HttpHeaders(headerDict),
        };

        return this.Service.Http
          .get<any>(url, requestOptions).pipe(
            map((d: any) => (d ? d : false)))
          .subscribe((r: any) => resolve(r), reject);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sms(body): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        const url = 'https://app.messagefunda.com/api/SMSCampaign/sendSMSCampaign';
        return this.Service.Http
          .post<any>(url,body).pipe(
            map((d: any) => (d ? d : false)))
          .subscribe((r: any) => resolve(r), reject);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
