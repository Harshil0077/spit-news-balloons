import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, first, tap } from 'rxjs/operators';
import { RestService } from 'src/app/core_auth/service/rest.service';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';


const endpoint = environment.appUrl;
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  collection  = [];

  constructor(private restService: RestService, private http: HttpClient) { 
    for (let i = 1; i <= 100; i++) {
      this.collection.push(`item ${i}`);
    }
  }
  events: Array<any> = [];

  event:any;
  currentUser = null;
  currentIndex = -1;
  email : string;
  page: number = 1;
  count :  number;
  pageSize = 15;
  pageSizes = [3, 6, 9];

  ngOnInit(): void {
    this.http.get(endpoint + "/api/admin/events", {headers: this.getHeader(FormData) }).subscribe((data) => {
      this.events = data["data"];
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
    refresh(response){
      if(response['status'] == 200){
        //alert("Category Updated successfully");
        alert(response['msg']);
        
      }
    }

}
