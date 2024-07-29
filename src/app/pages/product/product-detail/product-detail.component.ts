
import { Component, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl  } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  
  private activeRoute: any;
  products: any = [];
  category: any = [];
  submitted = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    var product_id;
      this.activeRoute = this.route.params.subscribe(params => {
        product_id =  params['id'];
    });
    var formData: any = new FormData();
    formData.append("product_id", product_id);
    this.http.post(endpoint + "/api/admin/viewProduct" , formData, {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.products = data["data"];
    }, (error) => {
      alert(error['error']['meta']['msg']);
    });
    
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

}
