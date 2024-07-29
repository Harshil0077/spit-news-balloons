import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, first, tap } from 'rxjs/operators';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  collection  = [];
  constructor(private restService: RestService, private http: HttpClient) { 
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  orders: any = [];
  order:any;
  currentUser = null;
  currentIndex = -1;
  email : string;
  page: number = 1;
  count :  number;
  pageSize = 15;
  pageSizes = [3, 6, 9];

  ngOnInit(): void {
    this.http.get(endpoint + "/api/admin/orders", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.orders = data["data"];
    }, (error) => {
      alert(error['message']);
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
  cmpltOrder(id){
    var formData: any = new FormData();
    formData.append("order_id", id);

       this.http.post(endpoint + "/api/admin/markascomplete", formData, {headers: this.getHeader(FormData) }).subscribe(
        (response) => {
          this.refresh(response)
        },
        (error) => {
          alert(error['message']);
        });
    }
    refresh(response){
      if(response['status'] == 200){
        //alert("Category Updated successfully");
        alert(response['msg']);
        this.http.get(endpoint + "/api/admin/orders", {headers: this.getHeader(FormData) }).subscribe((data) => {
          this.orders = data["data"];
        }, (error) => {
          alert(error['message']);
        });
      }
    }
}
