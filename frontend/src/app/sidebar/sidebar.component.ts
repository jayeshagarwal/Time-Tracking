import { Component, OnInit } from '@angular/core';
import { Project, projectStatus, projectType } from '../project';
import { Router, ActivatedRoute } from '@angular/router'; 
import { ProjectService } from '../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
 ;

  constructor(private router:Router, private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit() 
  {

  }
}
