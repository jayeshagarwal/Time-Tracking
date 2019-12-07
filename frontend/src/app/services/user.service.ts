import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

let token = localStorage.getItem('token');
if(token)
{
  httpOptions.headers = httpOptions.headers.append('Authorization', 'Bearer ' + token);
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersUrl = 'http://localhost:4002/api/user/';
  constructor(private http: HttpClient) { }

  searchUser () {
    return this.http.get(this.usersUrl+"search", httpOptions);
  }
  checkUser (user) {
    return this.http.get(this.usersUrl+"search?status="+user.status+"&userType="+user.userType+"&firstName="+user.firstName+"&lastName="+user.lastName+"&id="+user.id, httpOptions);
  }
  createUser(user) {
    return this.http.post(this.usersUrl+"add", user, httpOptions);
  }
  deleteUser(id) {
    return this.http.post(this.usersUrl+"delete", {id:id}, httpOptions);
  }
  editUser(id) {
    return this.http.get(`${this.usersUrl}/edit/${id}`, httpOptions);
  }
  updateUser(user) {
    return this.http.post(`${this.usersUrl}/edit/${user.id}`, user, httpOptions);
  }
}
