import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, first, tap } from 'rxjs/operators';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
const endpoint = environment.appUrl;
@Component({
  selector: 'ngx-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  category: any = [];
    
  constructor(private restService: RestService, private http: HttpClient) { }

  categories: any = [];

  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.http.get(endpoint + "/api/admin/category", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.categories = data["data"];
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
