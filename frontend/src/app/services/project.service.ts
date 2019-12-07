import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Project } from '../project';

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

export class ProjectService {
  private projectsUrl = 'http://localhost:4002/api/project/';
  private projectResourceUrl = 'http://localhost:4002/api/projectResource/';
  private usersUrl = 'http://localhost:4002/api/user/';  // URL to web api
  constructor(private http: HttpClient) { }

  searchProject (project) {
    return this.http.get(this.projectsUrl+"search", httpOptions);
  }
  searchPM (user) {
    return this.http.get(this.usersUrl+"search?userType="+ user.userType, httpOptions);
  }
  checkProject (project) {
    return this.http.get(this.projectsUrl+"search?status="+project.status+"&projectManagerId="+project.projectManagerId+"&startDate="+project.startDate+"&endDate="+project.endDate+"&id="+project.id+"&projectName="+project.projectName, httpOptions);
  }
  createProject(project) {
    return this.http.post(this.projectsUrl+"add", project, httpOptions);
  }
  deleteProject(id) {
    return this.http.post(this.projectsUrl+"delete", {id:id}, httpOptions);
  }
  editProject(id) {
    return this.http.get(`${this.projectsUrl}/edit/${id}`, httpOptions);
  }
  updateProject(project) {
    return this.http.post(`${this.projectsUrl}/edit/${project.id}`, project, httpOptions);
  }
  createResource(resource) {
    return this.http.post(this.projectResourceUrl+"add", resource, httpOptions);
  }
  searchUser (id) {
    return this.http.get(this.projectResourceUrl+"search?projectId="+id, httpOptions);
  }
  deleteUser(resource) {
    return this.http.post(this.projectResourceUrl+"delete", resource, httpOptions);
  }
}