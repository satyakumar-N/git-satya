import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { CommonService } from 'src/app/shared/common.service';
import { WebapiService } from 'src/app/shared/webapi.services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm: NgForm;
  emailModel = 'demo@vien.com';
  passwordModel = 'demovien1122';

  buttonDisabled = false;
  buttonState = '';
  Login: FormGroup;
  Submitted: boolean;
  hide = true;

  constructor(private authService: AuthService,
    public CF: CommonService,
    private router: Router,
    private fb: FormBuilder,
    private Service: WebapiService) { }


  ngOnInit(): void {
    localStorage.removeItem('User_details')
    this.Login = this.fb.group({
      Email: ['', [Validators.required]],
      // Email: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w-\.\']{1,}\@([\da-zA-Z-]{1,}\.){1,}[\da-zA-Z-]{2,3}$/),]),],
      Password: ['', [Validators.required]],
    });
  }

  login() {
    this.Submitted = true;
    if (!this.Login.invalid) {
      this.buttonDisabled = true;
      this.buttonState = 'show-spinner';
      const body = [
        {
          "columnName": "user_name",
          "columnValue": this.Login.get("Email").value
        },
        {
          "columnName": "user_password",
          "columnValue": this.Login.get("Password").value
        }];
      this.Service.Login(body).then(ra => {
        this.buttonDisabled = false;
        this.buttonState = '';
        if (ra.code === 1) {
          const r = ra.document.records;
          r[0].role_id === 101 ? r[0].roleid = 'Admin' : r[0].role_id === 301 ? r[0].roleid = 'Inspector' : r[0].role_id === 201 ? r[0].roleid = 'Qc' : r[0].role_id === 501 ? r[0].roleid = 'Jobs' : r[0].role_id === 701 ? r[0].roleid = 'Qc_Insp' : r[0].roleid = '';
          localStorage.setItem('User_details', JSON.stringify(r[0]))
          this.CF.ToastSuccess('Login Successfully', 'Success');
          r[0].role_id === 101 ? this.CF.GotoURL('/dashboard') : r[0].role_id === 301 ? this.CF.GotoURL('/inspection') : r[0].role_id === 201 ? this.CF.GotoURL('/qcdashboard') : r[0].role_id === 501 ? this.CF.GotoURL('/jobcreation') : r[0].role_id === 701 ? this.CF.GotoURL('/QcInspDashboard') : this.CF.GotoURL('/dashboard');
        } else {
          this.CF.ToastError('Login Failed')
        }
      })
    } else {
      this.buttonDisabled = false;
      this.buttonState = '';
    }
  }

  // onSubmit(): void {
  //   if (!this.loginForm.valid || this.buttonDisabled) {
  //     return;
  //   }
  //   this.buttonDisabled = true;
  //   this.buttonState = 'show-spinner';

  //   let data = { 'name': 'pavan', 'mobilenumber': '9492659716', 'email': 'pavan@graylogic.in', 'member_id': 5000, 'role': 'Admin' };
  //   localStorage.setItem('userDetails', JSON.stringify(data));
  //   localStorage.setItem('theme_user_role', 'Admin');

  //   // this.authService.signIn(this.loginForm.value).then(user => {
  //   //   this.router.navigate([environment.adminRoot]);
  //   // }).catch((error) => {
  //   //   this.buttonDisabled = false;
  //   //   this.buttonState = '';
  //   //   this.notifications.create('Error', error.message,
  //   //     NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
  //   // });
  //   // this.notifications.create('Success', 'Login Success',
  //   // NotificationType.Bare, { theClass: 'primary', timeOut: 3000, showProgressBar: true, });
  //   this.CF.ToastSuccess("Login Successfully", "Success");
  //   // this.router.navigate([environment.adminRoot]);
  //   this.CF.GotoURL('/vien')
  // }
}
