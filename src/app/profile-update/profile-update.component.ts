import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../core_auth/service/rest.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl
@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {
  loading : boolean;
  percentDone: any;
  isNotShowDiv = true
  isShowDiv = false;
  massage: string;
  msg: string;
  users: Array<any> = [];
  user: any = [];
  private activeRoute: any;
  submitted = false;
  form: FormGroup;

  constructor(private restService: RestService, private http: HttpClient, private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private location: Location , private actRoute: ActivatedRoute,  public dialog: MatDialog) { 
    this.form = this.fb.group({
      name: ['', Validators.required ],
      profile_image: [null],
      phone_number:['', Validators.required ],
    })
  }

  ngOnInit(): void {
    var user_id = localStorage.getItem('userId');
    var formData: any = new FormData();

    formData.append("user_id", user_id);

    this.http.post(endpoint + '/api/getProfile', formData,  { headers: this.getHeader(FormData) }).subscribe((data) => {
      this.user = data["data"];
   })
  }
  get f() { return this.form.controls; }
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    this.isNotShowDiv = !this.isNotShowDiv;
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      profile_image: file,
    });
    this.form.get('icon').updateValueAndValidity()
  }
  submitForm() {
    
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');
    
    if(this.form.get('profile_image').value != null)
    {
      formData.append("profile_image", this.form.get('profile_image').value);
    }
    formData.append("name", this.form.get('name').value);
    formData.append("phone_number", this.form.get('phone_number').value);
    formData.append("user_id", user_id);
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id = params['id'];
    });
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.http.post(endpoint + '/api/updateProfile', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
        (response) => {
          if (response.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * response.loaded / response.total);
        }
          if(response['body'] != undefined)
          {
            this.refresh(response);
          }
        },
        (error) => {
          alert(error['error']['meta']['msg']);
          this.loading = !this.loading;
        }
      );
    }
  }
  refresh(response){
    if(response['status'] == 200){
      //alert("Category Updated successfully");
      this.router.navigate(['/profile-detail']);
      this.openDialog();
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
  getHeader(isFormData?) {
    let headers: HttpHeaders = new HttpHeaders();
    
    if (!isFormData) {
      headers = headers.append('Content-Type', 'json');
    }
    headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
    return headers;
  }
  ngOnDestroy() {
    if (this.activeRoute) {
      this.activeRoute.unsubscribe();
    }
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