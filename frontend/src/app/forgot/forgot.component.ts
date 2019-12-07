import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router'; 
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  user = {
    email: ''
  };
  constructor(private router:Router, private loginService: LoginService, private toastr: ToastrService) { 

  }

  ngOnInit() {

  }
  checkEmail()
  {
    this.loginService.checkEmail(this.user).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
        //  this.router.navigate(['/project']);
        }
        else
        {
          this.errorsmsg();
        }
      }
    )
  }
  
  errorsmsg(){  
    this.toastr.error("Invalid Email. Please try again!",'Error')  
  }

}
