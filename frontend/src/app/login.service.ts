import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:4002/api/auth/login';
  constructor(private http: HttpClient) { }

  checkUser (login: User): Observable<User> {
    return this.http.post<User>(this.loginUrl, login, httpOptions);
  }

}
