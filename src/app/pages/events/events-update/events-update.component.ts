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
  selector: 'app-events-update',
  templateUrl: './events-update.component.html',
  styleUrls: ['./events-update.component.css']
})
export class EventsUpdateComponent implements OnInit {
  submitted = false;
  dropdownSettings = {};
  selectedItems = [];
  dropdownList : Array<any> = [];
  percentDone : any;
  loading : boolean;
  isFormSubmitted = false;
  massage: string;
  msg: string;
  isNotShowDiv = true
  isShowDiv = false;
  event: any = [];
  private activeRoute: any;
  form: FormGroup;
  events: any [];
  products: Array<any> = [];
  product : Array<any> = [];
  selected : Array<any> = [];
  i = 0;

  constructor(private restService: RestService, private http: HttpClient, private router: Router, private route: ActivatedRoute, public fb: FormBuilder, private location: Location , private actRoute: ActivatedRoute,  public dialog: MatDialog) { 
    this.form = this.fb.group({
      event_name: ['', Validators.required ],
      product_ids:['', Validators.required ] 
    })
  }

  get f() { return this.form.controls;}

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
    this.isNotShowDiv = !this.isNotShowDiv;
  }

  ngOnInit(): void {
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id = params['id'] ;
   });
    this.http.get(endpoint + '/api/admin/events/' + id, {headers: this.getHeader(FormData)}).subscribe((data) => {
      this.event = data["data"];
      let sel = [];
      for (let i = 0; i < this.event.products.length; i++) {
        sel.push({ item_id: this.event.products[i].id, item_text: this.event.products[i].product_name });
      }
      this.selectedItems = sel;
    }, (error) => {
      console.log(error)
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 6,
      allowSearchFilter: true
    };

    var id;
    this.activeRoute = this.route.params.subscribe(params => {
      id =  params['id'] ;
    });

    this.http.get(endpoint + "/api/admin/product", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.product = data["data"];
      let tmp = [];
      for (let i = 0; i < data["data"].length; i++) {

        tmp.push({ item_id: data["data"][i].id, item_text: data["data"][i].product_name});

        this.dropdownList = tmp;
      }
    }, (error) => {
      console.log(error)
    });
    
  }
  onItemSelect(item : any){
    this.selected[this.i] = item.item_id;
    this.i++;
  }
  
  onSelectAll(items: any) {
    
  }
  onItemDeSelect(item: any) {
    var id = item.item_id;
    this.selected.forEach((element,index)=>{
      if(element==id) this.selected.splice(index,1);
    });
  }
  submitForm() {
    let val = [];
    var formData: any = new FormData();
    formData.append("event_name", this.form.get('event_name').value);
    for (let i = 0; i < this.form.get('product_ids').value.length; i++) {
      val.push(this.form.get('product_ids').value[i].item_id);
    }
    formData.append("product_ids", JSON.stringify(val));
    var id;
    this.activeRoute = this.route.params.subscribe(params => {
    id = params['id'];
    });
    this.submitted = true;
    if (this.form.valid) {
      this.loading = true;
      this.http.post(endpoint + '/api/admin/updateevent/' + id, formData, {reportProgress: true, observe: 'events', headers: this.getHeader(FormData) }).subscribe(
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
      this.router.navigate(['/pages/events/events-list']);
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
