import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router'; 
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  constructor(private router:Router, private loginService: LoginService, private toastr: ToastrService) { 

  }

  ngOnInit() {

  }
  checkUser()
  {
    this.loginService.checkUser(this.user).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          localStorage.setItem('token', res.data.token);
          this.router.navigate(['/side']);
        }
        else
        {
          this.errorsmsg();
        }
      }
    )
  }
  
  errorsmsg(){  
    this.toastr.error("Invalid Email or Password. Please try again!",'Error')  
  }
}