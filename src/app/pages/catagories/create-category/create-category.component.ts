import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCategoryComponent implements OnInit {
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  massage: string;
  msg: string;
  form: FormGroup;
  category: any;
  
  constructor(private http: HttpClient, private router: Router,public fb: FormBuilder, private location: Location,  public dialog: MatDialog) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      category_name: ['', Validators.required],
    })
  }

  submitForm() {
    this.isFormSubmitted = true;

    // Return if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    var formData: any = new FormData();
    formData.append("category_name", this.form.get('category_name').value);
    this.http.post(endpoint + '/api/admin/category', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
        this.loading = !this.loading;
      }
    )
    
  }
  refresh(response){
    if(response['status'] == 200){
      this.loading = !this.loading;
      this.router.navigate(['/pages/catagories/category-list']);
      this.openDialog();
    }
  }
 
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      direction: "ltr",
      data: { massage: this.msg }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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