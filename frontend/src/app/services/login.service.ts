import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = 'http://localhost:4002/api/auth/';
  constructor(private http: HttpClient) { }

  checkUser (login: User): Observable<User> {
    return this.http.post<User>(this.loginUrl+"login", login, httpOptions);
  }
  checkEmail (login) {
    return this.http.post(this.loginUrl+"forgot", login, httpOptions);
  }
  checkPassword (login) {
    return this.http.post(this.loginUrl+"reset?token=" + login.token, login, httpOptions);
  }
}
