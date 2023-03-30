import { Component } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms'
import { AuthService} from '../service/auth.service'
import { ToastrService} from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userdata: any;

  constructor(private builder:FormBuilder,private toastr  :ToastrService,private service:AuthService,private router:Router){
    sessionStorage.clear();
  }

  loginForm=this.builder.group({
    username:this.builder.control('',Validators.required),
    password:this.builder.control('',Validators.required)
  });

  proceedLogin(){
    if(this.loginForm.valid){
    //   this.service.proceedRegister(this.loginForm.value).subscribe(res=>{
    //     this.toastr.success("Please contact admin for enable access!.. Registered successfully!");
    //     this.router.navigate(['login'])
    //   })
    // }
    // else{
    //   this.toastr.warning("Please enter valid data");
    this.service.getByCode(this.loginForm.value.username).subscribe(res=>{
      this.userdata=res;
      console.log(this.userdata);
      if(this.userdata.password===this.loginForm.value.password){
        if(this.userdata.isactive){
          sessionStorage.setItem('username',this.userdata.id);
          sessionStorage.setItem('userrole',this.userdata.role);
          this.router.navigate(['']);
        }
        else{
          this.toastr.error("In active user! Contact admin");
        }
      }
      else{
        this.toastr.error("Invalid credentials");
      }
    })
    }
  }

}
