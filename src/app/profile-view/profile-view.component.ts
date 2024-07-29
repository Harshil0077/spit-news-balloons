import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core_auth/auth/auth.service';
import { environment } from 'src/environments/environment';

const endpoint = environment.appUrl;
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  users: Array<any> = [];
  user: any = [];
  constructor(public http: HttpClient,  private authService: AuthService) { }

  ngOnInit(): void {
    var user_id = localStorage.getItem('userId');
    var formData: any = new FormData();
    formData.append("user_id", user_id);
    this.http.post(endpoint + '/api/getProfile', formData,  { headers: this.getHeader(FormData) }).subscribe((data) => {
      this.user = data["data"];
    })
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
