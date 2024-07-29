import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  loading : boolean;
  percentDone: any;
  isNotShowDiv = true
  isShowDiv = false;
  massage: string;
  msg: string;
  category: any = [];
  private activeRoute: any;
  submitted = false;
  form: FormGroup;
  categories: any [];

  constructor(private restService: RestService, private http: HttpClient, private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private location: Location , private actRoute: ActivatedRoute,  public dialog: MatDialog) { 
    this.form = this.fb.group({
      category_name: ['', Validators.required ],
    })
  }
  get f() { return this.form.controls; }
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    this.isNotShowDiv = !this.isNotShowDiv;
  }

  ngOnInit(): void {
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id = params['id'] ;
   });
    this.http.get(endpoint + '/api/admin/category/' + id, {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.category = data["data"];
    }, (error) => {
      console.log(error)
    });
  }
  submitForm() {
    
    var formData: any = new FormData();
    formData.append("category_name", this.form.get('category_name').value);
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id = params['id'];
    });
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.http.post(endpoint + '/api/admin/updatecategory/' + id, formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
      );
    }
  }
  refresh(response){
    if(response['status'] == 200){
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