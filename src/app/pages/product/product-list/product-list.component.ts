import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  page = 1;
  products: any = [];
  pageSize = 15;
  pageSizes = [3, 6, 9];
  count :  number;
  collection  = [];
  product_name : string;
  msg: string;
  constructor(private restService: RestService,  private http: HttpClient,  public dialog: MatDialog) {
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
   }

  ngOnInit(): void {
    
    this.reloadData();
  }
  reloadData() {
    this.http.get(endpoint + "/api/admin/product",  {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.products = data["data"];
    }, (error) => {
      alert(error['message']);
    });
  }
  DltProduct(id){
    let _id = id

    this.http.delete(endpoint + `/api/admin/product/${_id}`, {headers: this.getHeader(FormData) }).subscribe
    ((response) => {window.location.reload();
      this.openDialog();
    }, (error) => {});
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