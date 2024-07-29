import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css']
})
export class EventsCreateComponent implements OnInit {
  dropdownSettings = {};
  submitted = false;
  selectedItems = [];
  dropdownList : Array<any> = [];
  selected : Array<any> = [];
  i = 0;
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  massage: string;
  msg: string;
  form: FormGroup;
  products: Array<any> = [];
  product : Array<any> = [];
  product_id : Array<any> = [];
  rv = {};

  
  
  constructor(private http: HttpClient, private router: Router,public fb: FormBuilder, private location: Location,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      event_name:['', Validators.required],
      product_ids:['', Validators.required],
    });
    this.http.get(endpoint + "/api/admin/product", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.products = data["data"];
      let tmp = [];
        for (let i = 0; i < data["data"].length; i++) {

          tmp.push({ item_id: data["data"][i].id, item_text: data["data"][i].product_name});

          this.dropdownList = tmp;
        }
    }, (error) => {
      alert(error['message']);
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  onItemSelect(item : any){
    this.selected[this.i] = item.item_id;
    this.i++;
  }
  onItemDeSelect(item: any) {
    var id = item.item_id;
    this.selected.forEach((element,index)=>{
      if(element==id) this.selected.splice(index,1);
    });
  }
  submitForm() {
    this.isFormSubmitted = true;
    let val = [];
    // Return if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    var formData: any = new FormData();
    
    formData.append("event_name", this.form.get('event_name').value);
    
    for (let i = 0; i < this.form.get('product_ids').value.length; i++) {
      val.push(this.form.get('product_ids').value[i].item_id);
    }
    
    // formData.append("product_ids", JSON.stringify(val));

    // for (let j = 0; j < this.selected.length; j++) {
    //   //val.push(this.form.get('product_ids').value[j].item_id);
    //   this.rv = this.selected
    // }
    
    formData.append("product_ids", JSON.stringify(val));
    
    this.http.post(endpoint + '/api/admin/events', formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
        alert(error['massage']);
        this.loading = !this.loading;
      }
    )
    
  }
  refresh(response){
    if(response['status'] == 200){
      this.loading = !this.loading;
      this.router.navigate(['/pages/events/events-list']);
      //alert("Category added Successfully");
      this.openDialog();
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