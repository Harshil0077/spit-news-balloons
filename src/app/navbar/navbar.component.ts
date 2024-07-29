import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../core_auth/auth/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../core_auth/service/rest.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { environment } from 'src/environments/environment';


const endpoint = environment.appUrl;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
  response: any = [];
  signupEmail: any;
  signupPassword: any;
  submitted = false;
  showModal: boolean;
  user_name : any = [];
  signupForm : FormGroup;
  id: string;
  IsResetFormValid = true;
  user_id : any;
  constructor(private restService: RestService,public http: HttpClient, private formBuilder: FormBuilder, public fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) { }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  
  
  ngOnInit(): void {
      var formData: any = new FormData();
      var user_id = localStorage.getItem('userId');
      formData.append("user_id", user_id);

      this.http.post(endpoint + '/api/getProfile', formData,  { headers: this.getHeader(FormData) }).subscribe((data) => {
        this.user = data["data"];
      })
    
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
    

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      icon: [null, Validators.required]
    });

    this.mailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    
  }

  get f() { return this.loginForm.controls;};
  get form() {return this.signupForm.controls;};
  get p() { return this.mailForm.controls;}
  login() {
    
    this.submitted = true;
    var email, password;
    if(this.loginForm.get('email').value != '' && this.loginForm.get('password').value != ''){
      if (this.loginForm.invalid) {
        
        return;
      }
      email = this.loginForm.value.email;
      password = this.loginForm.value.password;
    }else{
      email = this.signupEmail;
      password = this.signupPassword;
    }
    this.authService.login(email, password).subscribe((response) => {
      
      if (response) {
        this.refresh2(response);
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('name', response["data"]["name"]);
        
        this.user_id = response["data"].id;
        this.user_name = response["data"]["name"];
        var formData: any = new FormData();
        var user_id = localStorage.getItem('userId');
        formData.append("user_id", user_id);

        this.http.post(endpoint + '/api/getProfile', formData,  { headers: this.getHeader(FormData) }).subscribe((data) => {
          this.user = data["data"];
          this.isUserLoggedIn = this.authService.isUserLoggedIn();
          this.showModal = false;
        })
        
      }
    }, (error) => {
    });
  }
  uploadFile(event) {
    
    const file = (event.target as HTMLInputElement).files[0];
    this.signupForm.patchValue({
      icon: file,
    });
    this.signupForm.get('icon').updateValueAndValidity()
  }

  public logout() {
    this.authService.logout();
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }
  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.signupForm.get('name').value);
    formData.append("email", this.signupForm.get('email').value);
    formData.append("phone_number", this.signupForm.get('phone').value);
    formData.append("password", this.signupForm.get('password').value);
    formData.append("profile_image", this.signupForm.get('icon').value);
    this.signupEmail = this.signupForm.get('email').value;
    this.signupPassword = this.signupForm.get('password').value;
    this.submitted = true;

    if (this.signupForm.valid) {

      this.loading = true;

      this.http.post(endpoint + '/api/signup', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
        (response) => {
        this.refresh(response);
      },
      (error) => {
        this.loading = !this.loading;
      });
    }
  }
  refresh2(response){
      if((response.error == false)){
        this.loading = !this.loading;
        //this.login();
      }else{
        this.msg = response.msg
        this.openDialog();
      }
  }
  refresh(response){
    if((response.body)){
      if((response.body.error == false)){
        this.showModal = false;
        this.isUserLoggedIn = true;
        this.loading = !this.loading;
        this.login();
      }else{
        this.msg = response.body.msg
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
  
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.msg = result;
    });
  }

  openDialog2(): void {
    let dialogRef = this.dialog.open(SignupDialogOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.msg = result;
    });
  }
  
  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        otp: ['', [Validators.required, Validators.minLength(4)]],
        newPassword: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
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
export class ForgotpasswordDialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<ForgotpasswordDialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
export class SignupDialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<SignupDialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}