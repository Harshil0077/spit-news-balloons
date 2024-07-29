import { Component, OnInit } from '@angular/core';
import {Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';

import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { AuthService } from 'src/app/core_auth/auth/auth.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  response: any = [];
  users: Array<any> = [];
  user: any = [];
  mailForm: FormGroup;
  ResponseResetForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  msg: string;
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  isUserLoggedIn:boolean = false;
  profile: any=[];
  loginForm: FormGroup;
  submitted = false;
  showModal: boolean;
  signupForm : FormGroup;
  id: string;
  IsResetFormValid = true;
  user_id : any;

  constructor(private location: Location , private restService: RestService,public http: HttpClient, private formBuilder: FormBuilder, public fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) { 
    this.ResponseResetForm = this.formBuilder.group({
      otp: ['', Validators.required],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password:['', [Validators.required, Validators.minLength(8)]]
    });
  }


  get f() { return this.ResponseResetForm.controls;};
  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }
  
  Validate(passwordFormGroup: FormGroup) {
    const newpassword = passwordFormGroup.controls.new_password.value;
    const confirmpassword = passwordFormGroup.controls.confirm_password.value;

    if (confirmpassword.length <= 0) {
      return null;
    }

    if (confirmpassword !== newpassword) {
      return {
        doesNotMatch: true
      };
    }

    return null;
  }
  ResetPassword(form) {
    console.log('andar gyu')
    this.msg = "";
    if (this.ResponseResetForm.invalid) {
      this.IsResetFormValid = false;
      this.isFormSubmitted = false;
    }else{
      console.log('fndkjbv')
      if(this.ResponseResetForm.value.new_password.length >= 8){
        if(this.ResponseResetForm.value.new_password.length >= 8){
          if(this.ResponseResetForm.value.confirm_password.length >= 8){
            if(this.ResponseResetForm.value.new_password == this.ResponseResetForm.value.confirm_password){
              this.IsResetFormValid = true;
              this.isFormSubmitted = true;
              this.http.post(endpoint + '/api/resetpassword', this.ResponseResetForm.value, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
              (response) => {
                
                this.response = response;
                this.refresh(response);
                if (response.type === HttpEventType.UploadProgress) {
                  this.percentDone = Math.round(100 * response.loaded / response.total);
                }
              },
              (error) => {
                this.loading = !this.loading;
              });
            }else{
              this.msg = "New Password and Confirm Password does not match";
              this.openDialog();
            }
          }else{
            this.msg = "Confirm Password should be 8 character long.";
            this.openDialog();
          }
        }else{
          this.msg = "New Password should be 8 character long.";
          this.openDialog();
        }
      }else{
        this.msg = "Old Password should be 8 character long.";
        this.openDialog();
      }
    }
  }
  getHeader(isFormData?) {
    let headers: HttpHeaders = new HttpHeaders();
    
    if (!isFormData) {
      headers = headers.append('Content-Type', 'json');
    }
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
  }
  refresh(response){
    if((response.body)){
      if((response.body.error == false)){
        this.loading = !this.loading;
          this.showModal = false;
          localStorage.removeItem('userId');
          localStorage.removeItem('role_id');
          localStorage.removeItem('accessToken');
          this.router.navigate(['/home']);
          //this.msg = response.body.msg;
          this.openDialog();
      }else{
        this.msg = response.body.msg
        this.openDialog();
        
      }
    }
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.msg = result;
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}