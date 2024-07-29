import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  collection  = [];
  constructor(private restService: RestService, private http: HttpClient) { 
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  customers: Array<any> = [];

  customer:any;
  currentUser = null;
  currentIndex = -1;
  email : string;
  page: number = 1;
  count :  number;
  pageSize = 15;
  pageSizes = [3, 6, 9];

  ngOnInit(): void {
    this.http.get(endpoint + "/api/admin/customer", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.customers = data["data"];
    }, (error) => {
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
