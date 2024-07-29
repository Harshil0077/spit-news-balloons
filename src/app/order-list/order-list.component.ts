import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from '../core_auth/service/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const endpoint = environment.appUrl;
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  order: any = [];
  page: number = 1;
  count :  number;
  pageSize = 15;
  pageSizes = [3, 6, 9];
  user_name:any=[];
  constructor(private restService: RestService, private http: HttpClient) { }

  order_list: any;

  ngOnInit(): void {
    this.user_name = localStorage.getItem('name');
    var formData: any = new FormData();
    var user_id = localStorage.getItem('userId');
    formData.append("customer_id", user_id);
    this.http.post(endpoint + '/api/orderList', formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.order_list = data["data"];
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
}
