
import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl  } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  private activeRoute: any;
  order: any = [];
  orders:any=[];
  isShown = false;
  orderPick :any = [];
  submitted = false;
  msg: string;
  allTotal = 0;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    var order_id;
    this.activeRoute = this.route.params.subscribe(params => {
      order_id =  params['id'];
    });
    var formData: any = new FormData();
    formData.append("order_id", order_id);
    this.http.post(endpoint + "/api/admin/order_detail" , formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.orders = data["data"]["orderDetails"];
      for(let i = 0; i < this.order.length; i++){
        this.orders = data["data"]["orderDetails"][i];
      }
      for (let i = 0; i < this.orders.length; i++){
        this.allTotal+= this.orders[i].total;
      }
      this.orderPick =  data["data"]["orders"]
      if(this.orders.status == 'pending'){
        this.isShown = ! this.isShown;
      }else{
        this.isShown = false;
      }
    }, (error) => {
      alert(error['msg']);
    });
    
  }
  cmpltOrder(){
    var order_id;
    this.activeRoute = this.route.params.subscribe(params => {
      order_id =  params['id'];
    });
    var formData: any = new FormData();
    formData.append("order_id", order_id);

       this.http.post(endpoint + "/api/admin/markascomplete", formData, {headers: this.getHeader(FormData) }).subscribe(
        (response) => {this.refresh(response)},
        (error) => {
          alert(error['message']);
        });
    }
    refresh(response){
      if(response['status'] == 200){
        alert(response['msg']);
        this.openDialog();
      }
    }

  ngOnDestroy() {
    if (this.activeRoute) {
      this.activeRoute.unsubscribe();
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
