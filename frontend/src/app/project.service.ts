import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Project } from './project';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  private projectsUrl = 'http://localhost:4002/api/project';  // URL to web api
  constructor( 
    private http: HttpClient
  ) { }

  getProject (): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectsUrl)
  }

  editProject(id: number): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get<Project>(url);
  }

  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(this.projectsUrl, project, httpOptions);
  }

  deleteCustomer (project: Project | number): Observable<Project> {
    const id = typeof project === 'number' ? project : project.id;
    const url = `${this.projectsUrl}/${id}`;

    return this.http.delete<Project>(url, httpOptions);
  }

  updateProject (project: Project): Observable<any> {
    return this.http.post(this.projectsUrl, project, httpOptions);
  }
}


