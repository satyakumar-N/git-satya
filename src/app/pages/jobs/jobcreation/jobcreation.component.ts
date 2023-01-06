import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/common.service';
import { jobcreationService } from './jobcreation.service';
import { Dropdownlist } from 'src/app/shared/dropdownlist.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-jobcreation',
  templateUrl: './jobcreation.component.html',
  styleUrls: ['./jobcreation.component.scss']
})
export class JobcreationComponent implements OnInit {
  addclientuser: FormGroup;
  submitted: boolean;
  Success: boolean;
  company_type: any;
  vehicle_type: any;
  state_list: any;
  branch_list: any = [];
  constructor(
    public jobcre_serv: jobcreationService,
    public CommonService: CommonService,
    private FormBuilder: FormBuilder,
    public dropdown_list: Dropdownlist,
    private http:HttpClient
  ) {

  }

  ngOnInit(): void {

    this.company_type = this.dropdown_list.Company_type.map((s: any) => ({
      id: s.value,
      itemName: s.label,
    }))

    this.state_list = this.dropdown_list.state_list.map((s: any) => ({
      id: s.state_name,
      itemName: s.state_name,
    }))

    this.state_list.sort(function (a, b) {
      return a.itemName < b.itemName ? -1 : a.itemName > b.itemName ? 1 : 0;
    });

    this.addclientuser = this.FormBuilder.group({
      company_type: ["", Validators.required],
      vehicle_type: ["", Validators.required],
      branchcode: ["", Validators.required],
      Jobid: ["", Validators.required],
      state: ["", Validators.required],
      fullname: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.pattern(/^([0-9a-zA-Z]{2}([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/)])],
      phonenumber: ["", Validators.required],
    });

    this.addclientuser.patchValue({
      company_type: [],
      vehicle_type: [],
      state: [],
      branchcode: []
    })

  }

  select_company(data) {
    if (data === 'C101' || data === 'C103') {
      this.vehicle_type = this.dropdown_list.vehicl_category.map((s: any) => ({
        id: s.value,
        itemName: s.label,
      }))
    } else {
      this.vehicle_type = this.dropdown_list.vehicl_category1.map((s: any) => ({
        id: s.value,
        itemName: s.label,
      }))
    }
  }

  select_state(data) {
    this.branch_list = this.dropdown_list.branch_list.filter((s: any) => s.STATE === data);

    function getUniqueListBy(arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    }

    this.branch_list = getUniqueListBy(this.branch_list, 'SBU_Code');

    this.branch_list.sort(function (a, b) {
      return a.SBU_Code < b.SBU_Code ? -1 : a.SBU_Code > b.SBU_Code ? 1 : 0;
    });

  }

  CheckData_jobid(value: any) {
    if (value != '') {
      const body = [
        {
          "columnName": "job_Id",
          "columnValue": value
        }
      ]
      this.jobcre_serv.filter(body).then((res: any) => {
        if (res.length > 0) {
          this.CommonService.SwalError('Job Id is already exists', 'Error');
          this.addclientuser.patchValue({
            Jobid: '',
          })
        }
      })
    } else {
    }
  }

  OnSubmit() {
    this.submitted = true;
    if (this.addclientuser.valid) {
      this.Success = true;
      const body = this.addclientuser.value;
      this.jobcre_serv.add_Job(body).then((res: any) => {
        this.Success = false;
        if (res.code === 1) {
          this.CommonService.SwalSuccess("Job Created Succcessfully", "Success");
          this.submitted = false;
          this.addclientuser.reset();
          this.get_data(res.document);
        } else {
          this.CommonService.ToastError("Something went wrong please try again", "Error");
          this.Success = false;
        }
      });
    }
  }

  get_data(data) {
    const body = [
      {
        "columnName": "sno",
        "columnValue": data.toString(),
      }
    ]
    this.jobcre_serv.filter(body).then((res: any) => {
      if (res) {
            const body = {
              "API_Key": "Vl4j9yhcYQ8kU6O3zRhLwwh4kR",
              "CampaignName": "",
              "RouteId": "1",
              "SenderID": "prinns",
              "SMSContentType": "English",
              "ScheduleDate": null,
              "SMSCampaignList": [
                {
                  "Mobile": res[0].mobileNo,
                  "SMSText": "Hi " + res[0].userName + ", Please Complete Your self inspection of Vehicle number "+ res[0].job_Id + ". Web URL - " + res[0].sms_link + " Regards Symplfy",
                  "CustomVar": "0"
                }
              ],
              "DLTTemplateId": "1207161520116553908",
              "TemplateName": "link",
              "URLShortenerId": "",
              "ShortURL": ""
            }

            this.jobcre_serv.sms(body).then((res: any) => {
            })
          }
    })
  }


}
