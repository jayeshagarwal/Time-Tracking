import { Component, OnInit } from '@angular/core';
import { projectStatus, projectType } from '../project';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ProjectService } from '../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

declare var $: any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
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

  newProject = {
    id: '',
    projectName: '',
    projectManagerId: '',
    projectType: '',
    status: '' ,
    startDate: '',
    endDate: ''
  };

  user = {
    userType: 2
  };

  addEmployee = {
    projectId: '',
    employeeId: ''
  }

  projectStatus = projectStatus;
  projectType = projectType;
  private allProjects = []; 
  private allPM = []; 
  private allUsers = []; 
  private allEmployees = [];
  display='none';
  anotherDisplay='none';

  constructor(private router:Router, private userService: UserService, private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.route.queryParams.subscribe(params => {
      this.user.userType = 2;
      console.log(projectStatus)
      //console.log(this.user);
    }),
    this.projectService.searchProject(this.project).subscribe(
      (res: any[]) => {
        this.allProjects = res.data.project;
        console.log(res);
        if(res["success"]===true)
        {
        //  this.router.navigate(['/project']);
          console.log("sucess");
        }
      }
    ),

    this.projectService.searchPM(this.user).subscribe(
      (res: any[]) => {
        this.allPM = res.data.users;
        console.log(this.allPM);
        if(res["success"]===true)
        {
        //  this.router.navigate(['/project']);
        console.log("sucess");
        }
      }
    )
  }
  
  checkProject()
  {
    this.projectService.checkProject(this.project).subscribe(
      (res: any[]) => {
        this.allProjects = res.data.project;
        console.log(this.allProjects);
        if(res["success"]===true)
        {
        //  this.router.navigate(['/project']);
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

 createProject()
  {
    this.projectService.createProject(this.newProject).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          console.log("success");
          this.closeModalDialog();
          this.checkProject();
          this.router.navigate(['/project']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  deleteProject(id)
  {
    this.projectService.deleteProject(id).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          this.checkProject();
          this.router.navigate(['/side']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  editProject(id)
  {
    this.openModalDialog();
    this.projectService.editProject(id).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          console.log(res)
          this.newProject.id = res.data.project[0].id;
          this.newProject.projectName = res.data.project[0].projectName;
          this.newProject.projectManagerId = res.data.project[0].projectManagerId;
          this.newProject.projectType = res.data.project[0].projectType;
          this.newProject.status = res.data.project[0].status;
          this.newProject.startDate = res.data.project[0].startDate;
          this.newProject.endDate = res.data.project[0].endDate;
          this.router.navigate(['/side']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  addProject()
  {
    this.openModalDialog();
    this.newProject.projectName = '';
    this.newProject.projectManagerId = '';
    this.newProject.projectType = '';
    this.newProject.status = '';
    this.newProject.startDate = '';
    this.newProject.endDate = '';
  }

  updateProject()
  {
    this.projectService.updateProject(this.newProject).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          console.log("update");
          this.closeModalDialog();
          this.checkProject();
          this.router.navigate(['/project']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  existProject(id)
  {
    if(!id)
    {
      this.createProject();
    }
    else
    {
      this.updateProject();
    }
  }

  searchUser(id)
  {
    this.projectService.searchUser(id).subscribe(
      (res: any[]) => {
        console.log('res', res);
        this.allEmployees = res.data;
        // console.log(this.allEmployees);
        if(res["success"]===true)
        { 
        //  this.router.navigate(['/project']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }
  manageResource(id)
  {
    this.openDialog();
    this.addEmployee.projectId = id;
    this.addEmployee.employeeId = '';
    this.searchUser(id),
    this.userService.searchUser().subscribe(
      (res: any[]) => {
        console.log(res);
        this.allUsers = res.data.users;
        if(res["success"]===true)
        { 
        //  this.router.navigate(['/project']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  createResource()
  {
    console.log(this.addEmployee);
    this.projectService.createResource(this.addEmployee).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]==true)
        {
          console.log("success");
          this.manageResource(this.addEmployee.projectId);
          // this.openDialog();
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  deleteUser(userId)
  {
    this.addEmployee.employeeId = userId;
    console.log(this.addEmployee);
    this.projectService.deleteUser(this.addEmployee).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]==true)
        {
          this.manageResource(this.addEmployee.projectId);
          // this.openDialog();
        }
        else
        {
          console.log("error");
        }
      }
    )
  }
}