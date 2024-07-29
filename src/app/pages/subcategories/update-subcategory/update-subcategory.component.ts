import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-update-subcategory',
  templateUrl: './update-subcategory.component.html',
  styleUrls: ['./update-subcategory.component.css']
})
export class UpdateSubcategoryComponent implements OnInit {
  submitted = false;
  dropdownSettings = {};
  selectedItems = [];
  dropdownList : Array<any> = [];
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  massage: string;
  msg: string;
  form: FormGroup;
  subcategory: any = [];
  subcategories: any = [];
  category: any;
  categories: any = [];
  private activeRoute: any;

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,public fb: FormBuilder, private location: Location,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      category_id: ['', Validators.required],
      sub_cat_name: ['', Validators.required],
    })

    var id;
    this.activeRoute = this.route.params.subscribe(params => {
      id =  params['id'] ;
    });

    this.http.get(endpoint + "/api/admin/subcategory/" + id ,{headers: this.getHeader(FormData) }).subscribe((data) => {
      this.subcategory = data["data"];
      this.selectedItems = [
        { item_id: data["data"].category_id, item_text: data["data"].category_name },
      ];
    }, (error) => {
    });

    this.form = this.fb.group({
      category_id:['', Validators.required],
      sub_cat_name: ['', Validators.required],
    });
    this.http.get(endpoint + "/api/admin/category", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.categories = data["data"];
      let tmp = [];
        for (let i = 0; i < data["data"].length; i++) {

          tmp.push({ item_id: data["data"][i].id, item_text: data["data"][i].category_name});
          this.dropdownList = tmp;
        }
    }, (error) => {
      alert(error['message']);
    });
    this.dropdownSettings = {
      singleSelection: true,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 6,
      allowSearchFilter: true
    };
  }
  submitForm() {
    let val = [];
    var formData: any = new FormData();
    
    for (let i = 0; i < this.form.get('category_id').value.length; i++) {
      val.push(this.form.get('category_id').value[i].item_id);
    }
    formData.append("category_id", (val));
    
    formData.append("sub_cat_name", this.form.value.sub_cat_name);

    var id;
    this.activeRoute = this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.http.post(endpoint + '/api/admin/updatesubcategory/' + id, formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
  }
  
  refresh(response){
    if(response['status'] == 200){
      this.loading = !this.loading;
      this.router.navigate(['/pages/subcategories/subcategory-list']);
      //alert("Category added Successfully");
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