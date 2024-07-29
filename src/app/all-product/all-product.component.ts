import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RestService } from '../core_auth/service/rest.service';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  activeRoute: any;
  products: any = [];
  image_path: any = [];
  events : Array<any> = [];
  event: any = [];
  selected = new FormControl(0);
  tabs : any = [];
  constructor(private restService: RestService,  private http: HttpClient, private router: Router, private route: ActivatedRoute) { }
  cards = [
    {
      title: this.products.product_name,
      description: this.products.description,
      img: this.products.product_main_image
    },
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit(): void {
    this.http.get(endpoint + "/api/events", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.events = data["data"];
      let tmp = [];
      for (let i = 0;  i < data["data"].length; i++) {
        tmp.push({ eventId: data["data"][i].id, eventName: data["data"][i].event_name})
        this.events = tmp;
      }
    }, (error) => {
      //alert(error['message']);
    });

    this.slides = this.chunk(this.cards, 3);
    this.http.post(endpoint + "/api/product", {headers: this.getHeader(FormData) }).subscribe((data) => {

      this.products= data["data"];
    }, (error) => {
      //alert(error['error']);
    });

  }
  myTabSelectedIndexChange(event: MatTabChangeEvent) {
    var id = event.tab.textLabel['eventId'];
    if(id != null || id != undefined){
      var formData: any = new FormData();
      formData.append("event_id", id);
      this.http.post(endpoint + `/api/product`, formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
      
        this.products = data["data"];
      }, (error) => {
      });
    }else{
      var formData: any = new FormData();
      this.http.post(endpoint + `/api/product`, {headers: this.getHeader(FormData) }).subscribe((data) => {
    
        this.products = data["data"];
      }, (error) => {
      });
    }   
        
  }
  getHeader(isFormData?) {
    let headers: HttpHeaders = new HttpHeaders();

    if (!isFormData) {
      headers = headers.append('Content-Type', 'json');
    }
    //headers = headers.append('Authorization', localStorage.getItem('access_token'));
    return headers;
  }
}
