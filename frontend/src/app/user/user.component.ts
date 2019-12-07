import { Component, OnInit } from '@angular/core';
import { userStatus, userType } from '../user';
import { Router, ActivatedRoute } from '@angular/router'; 
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user = {
    id: '',
    status: '',
    userType: '',
    firstName: '',
    lastName: ''
  };

  newUser = {
    id: '',
    status: '',
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber:'',
    designation: '',
    password:'',
    confirmPassword:''
  };

  userStatus = userStatus;
  userType = userType;
  private allUsers = []; 

  display='none';

  constructor(private router:Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() 
  {
    this.userService.searchUser().subscribe(
      (res: any[]) => {
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
  
  checkUser()
    {
      this.userService.checkUser(this.user).subscribe(
      (res: any[]) => {
        this.allUsers = res.data.users;
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

  createUser()
  {
    this.userService.createUser(this.newUser).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          this.closeModalDialog();
          this.checkUser();
          this.router.navigate(['/user']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  deleteUser(id)
  {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          this.checkUser();
          this.router.navigate(['/user']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  editUser(id)
  {
    this.openModalDialog();
    this.userService.editUser(id).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          this.newUser.id = res.data.user.id;
          this.newUser.firstName = res.data.user.firstName;
          this.newUser.lastName = res.data.user.lastName;
          this.newUser.email = res.data.user.email;
          this.newUser.userType = res.data.user.userType;
          this.newUser.status = res.data.user.status;
          this.newUser.mobileNumber = res.data.user.mobileNumber;
          this.newUser.designation = res.data.user.designation;
          this.newUser.password = res.data.user.password;
          this.newUser.confirmPassword = res.data.user.password;
          this.router.navigate(['/user']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  addUser()
  {
    this.openModalDialog();
    this.newUser.id = '';
    this.newUser.firstName = '';
    this.newUser.lastName = '';
    this.newUser.email = '';
    this.newUser.userType = '';
    this.newUser.status = '';
    this.newUser.mobileNumber = '';
    this.newUser.designation = '';
    this.newUser.password = '';
    this.newUser.confirmPassword = '';
  }

  updateUser()
  {
    this.userService.updateUser(this.newUser).subscribe(
      (res) => {
        if(res["success"]===true)
        {
          this.closeModalDialog();
          this.checkUser();
          this.router.navigate(['/user']);
        }
        else
        {
          console.log("error");
        }
      }
    )
  }

  existUser(id)
  {
    if(!id)
    {
      this.createUser();
    }
    else
    {
      this.updateUser();
    }
  }
}