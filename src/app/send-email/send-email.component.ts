import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core_auth/auth/auth.service';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { environment } from 'src/environments/environment';
const endpoint = environment.appUrl;
@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  users: Array<any> = [];
  user: any = [];
  mailForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  msg: string;
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  isUserLoggedIn:boolean = false;
  profile: any=[];
  submitted = false;
  showModal: boolean;
  id: string;
  IsResetFormValid = true;
  user_id : any;

  constructor(private restService: RestService,public http: HttpClient, private formBuilder: FormBuilder, public fb: FormBuilder, private authService: AuthService, private router: Router, public dialog: MatDialog) { 
    this.mailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get p() { return this.mailForm.controls;}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();
  }
  sendMail(){
    var formData: any = new FormData();
    formData.append("email", this.mailForm.get('email').value);

    this.http.post(endpoint + '/api/forgot-password', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
      (response) => {
        this.refresh(response);
        if (response.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * response.loaded / response.total);
        }
      },
      (error) => {
        alert(error);
        this.loading = !this.loading;
      })
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
      if((response.body.error == true)){
        this.loading = !this.loading;
          this.showModal = false;
          localStorage.removeItem('userId');
          localStorage.removeItem('role_id');
          localStorage.removeItem('accessToken');
          this.msg = "Mail Sent successfully, Please Check your email";
          this.router.navigate(['/reset-password']);
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