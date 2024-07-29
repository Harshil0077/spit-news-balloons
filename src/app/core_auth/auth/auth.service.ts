import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminAuth, UserAuth } from '../../_model/user-auth';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(email, password) {
    return this.http.post<UserAuth>(`${environment.appUrl}/api/signin`, { email, password })
  }

  adminLogin(email, password) {
    return this.http.post<AdminAuth>(`${environment.appUrl}/api/login`, { email, password })
  }
  
  public isUserLoggedIn() {
    localStorage.getItem('name') !== null;
    return localStorage.getItem('accessToken') !== null;
  }

  public logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role_id');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/home']);
  }
  public logout2() {
    localStorage.removeItem('userId');
    localStorage.removeItem('role_id');
    localStorage.removeItem('accessToken');
    this.router.navigate(['/admin']);
  }
  
}
