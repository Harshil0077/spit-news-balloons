import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css']
})
export class SubcategoryListComponent implements OnInit {
  page = 1;
  currentIndex = -1;
  category_name : string;
  pageSize = 15;
  pageSizes = [3, 6, 9];
  count :  number;
  collection  = [];
  subcategory: any;
  subcategories: any [];
  
  constructor(private restService: RestService, private Location: Location,  private http: HttpClient) { 
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    this.reloadData();
  }
  
  reloadData() {
    this.http.get(endpoint + "/api/admin/subcategory", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.subcategories = data["data"];
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
