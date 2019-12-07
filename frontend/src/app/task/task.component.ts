import { Component, OnInit } from '@angular/core';
import { projectStatus, projectType } from '../project';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ProjectService } from '../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { taskStatus } from '../task';

declare var $: any;

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public dateValue: Date = new Date ("");
  project = {
    id: '',
    projectName: '',
    projectManagerId: '',
    projectType: '',
    status: '' ,
    startDate: '',
    endDate: ''
  };

  task = {
    id: '',
    projectId: '',
    projectManagerId: '',
    projectType: '',
    taskStatus: '' ,
    taskDate: '',
    employeeId: '',
    hours: '',
    taskDetail: ''
  };

  user = {
    userType: ''
  };

  projectType = projectType;
  taskStatus = taskStatus;
  private allProjects = []; 
  private allTasks = []; 
  private allUsers = []; 

  display='none';
  anotherDisplay='none';

  constructor(private router:Router, private taskService: TaskService, private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.projectService.searchProject(this.project).subscribe(
      (res: any[]) => {
        this.allProjects = res.data.project;
        console.log(this.allProjects);
        if(res["success"]===true)
        {
          console.log("sucess");
        }
      }
    ), 
    this.taskService.searchTask(this.task).subscribe(
      (res: any[]) => {
        this.allTasks = res.data;
        console.log(this.allTasks);
        if(res["success"]===true)
        {
          console.log("sucess");
        }
      }
    ),
    this.projectService.searchPM(this.user).subscribe(
      (res: any[]) => {
        this.allUsers = res.data.users;
        console.log(this.allUsers);
        if(res["success"]===true)
        {
         console.log("sucess");
        }
      }
    )
  }
  
  checkTask()
  {
    this.taskService.checkTask(this.task).subscribe(
      (res: any[]) => {
        this.allTasks = res.data;
        console.log(this.allTasks);
        if(res["success"]===true)
        {
          console.log("sucess");
        }
      }
    )
  }

  openModalDialog(){
    this.display='block'; //Set block css
  }
  closeModalDialog(){
    this.display='none'; //set none css after close dialog
  }

  openDialog(){
    this.anotherDisplay='block'; //Set block css
  }
  closeDialog(){
    this.anotherDisplay='none'; //set none css after close dialog
  }

  approveTask(id)
  {
    this.openModalDialog();
    this.taskService.approveTask(id).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          this.task.id = res.data.task[0].id;
          if(res.data.task[0].employeeHours==res.data.task[0].pmHours)
          {
            this.task.hours = res.data.task[0].employeeHours;            
          }
          else
          {
            this.task.hours = res.data.task[0].employeeHours+'/'+res.data.task[0].pmHours;
          }
          console.log(res);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  declineTask(id)
  {
    this.openDialog();
    this.taskService.declineTask(id).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          this.task.id = res.data.task[0].id
          this.task.taskDetail = res.data.task[0].taskDetail;              
          console.log(res);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  updateHours()
  {
    this.task.taskDetail = '';
    this.taskService.updateHours(this.task).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          console.log("update");
          this.closeModalDialog();
          this.checkTask();
          this.router.navigate(['/task']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  updateTaskDetails()
  {
    this.task.hours = '';
    this.taskService.updateTaskDetails(this.task).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          console.log("update");
          this.closeDialog();
          this.checkTask();
          this.router.navigate(['/task']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

}