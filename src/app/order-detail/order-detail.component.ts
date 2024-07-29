import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  private activeRoute: any;
  order: any = [];
  orders:any=[];
  ordersTimeDate:any= [];
  orderPick:any = [];
  allTotal = 0;
  submitted = false;
  user :any =[];
  user_name:any=[];
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private location: Location, ) { }

  
  ngOnInit(): void {
    var formData: any = new FormData();
    this.user_name = localStorage.getItem('name');

      
    var order_id;
    this.activeRoute = this.route.params.subscribe(params => {
      order_id =  params['id'];
    });

    var formData: any = new FormData();
    formData.append("order_id", order_id);
    this.http.post(endpoint + "/api/orderDetail" , formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
    this.orders = data["data"]["orderDetails"];
    for (let i = 0; i < this.orders.length; i++){
      this.allTotal+= this.orders[i].total;
    }
    this.orderPick =  data["data"]["orders"]
    this.ordersTimeDate = data["data"]["orders"];
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
