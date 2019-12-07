import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router,ActivatedRoute } from '@angular/router'; 
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})


export class ResetComponent implements OnInit {

  user = {
    password:'',
    confirmPassword:'',
    token:''
  };
  constructor(private router:Router, private loginService: LoginService, private toastr: ToastrService, private route: ActivatedRoute) { 

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.user.token = params['token'];
      console.log(this.user);
    })
  }
  
  checkPassword()
  {
    this.loginService.checkPassword(this.user).subscribe(
      (res) => {
        console.log(res);
        if(res["success"]===true)
        {
          this.router.navigate(['/login']);
        }
        else
        {
          this.errorsmsg();
        }
      }
    )
  }
  
  errorsmsg(){
    if(this.user.confirmPassword!==this.user.password)
    {
      this.toastr.error("Password does not match. Please try again!",'Error')
    }
    else
    {
      this.toastr.error("Invalid Password. Please try again!",'Error')
    }  
  }

}
