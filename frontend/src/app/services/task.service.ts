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

export class TaskService {
  private taskUrl = 'http://localhost:4002/api/task/';
  constructor(private http: HttpClient) { }

  searchTask (task) {
    return this.http.get(this.taskUrl+"search", httpOptions);
  }
  checkTask (task) {
    return this.http.get(this.taskUrl+"search?taskStatus="+task.taskStatus+"&projectManagerId="+task.projectManagerId+"&taskDate="+task.taskDate+"&projectId="+task.projectId+"&projectType="+task.projectType+"&employeeId="+task.employeeId, httpOptions);
  }
  approveTask(id) {
    return this.http.get(`${this.taskUrl}edit/${id}`, httpOptions);
  }
  declineTask(id) {
    return this.http.get(`${this.taskUrl}edit/${id}`, httpOptions);
  }
  updateHours(task) {
    return this.http.post(`${this.taskUrl}edit/${task.id}`, task, httpOptions);
  }
  updateTaskDetails(task) {
    return this.http.post(`${this.taskUrl}edit/${task.id}`, task, httpOptions);
  }
}
