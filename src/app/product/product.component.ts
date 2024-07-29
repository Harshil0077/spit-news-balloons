import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../core_auth/auth/auth.service';
import { RestService } from '../core_auth/service/rest.service';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  //eventId :any = [];
  public Index = 1;
  isUserLoggedIn:boolean = false;
  activeRoute: any;
  products: any = [];
  image_path: any = [];
  events : Array<any> = [];
  event: any = [];
  selected = new FormControl(0);
  tabs : any = [];
  constructor( private authService: AuthService, private restService: RestService,  private http: HttpClient, private router: Router, private route: ActivatedRoute,) {}
  @ViewChild('tabGroup') tabGroup;
  
  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isUserLoggedIn();

    this.restService.get("/api/events").subscribe((data) => {
      //this.events = data["data"];
      let tmp = [];
      for (let i = 0;  i < data["data"].length; i++) {
        tmp.push({ eventId: data["data"][i].id, eventName: data["data"][i].event_name})
        this.events = tmp;
      }
    }, (error) => {
      alert(error['message']);
    });
  }
  

 myTabSelectedIndexChange(event: MatTabChangeEvent) {
  var id = event.tab.textLabel['eventId'];
  var formData: any = new FormData();  
  formData.append("event_id", id);
  this.http.post( endpoint + "/api/product", formData , { headers: this.getHeader(FormData) }).subscribe((data) => {

    this.products = data["data"];
  }, (error) => {
    //alert(error['error']);
  });   
      
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
