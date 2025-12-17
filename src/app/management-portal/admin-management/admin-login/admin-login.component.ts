import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})

export class AdminLoginComponent {

  public userLoginForm : FormGroup | any;
  public optCodeForm: FormGroup | any;
  public token:any;
  public role:any;

  constructor(
    private readonly FormBuilder:FormBuilder,
    private readonly Router:Router,
    private readonly loginSerice:LoginService,
    private readonly toaster:ToastrService,

  ) { 
    this.userLoginFormModel();
    this.optCodeFormModel();
  }

  ngOnInit(): void {
  }

  userLoginFormModel() {
    this.userLoginForm = this.FormBuilder.group({
      userName: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }

  optCodeFormModel() {
    this.optCodeForm = this.FormBuilder.group({
      optCode: new FormControl('',Validators.required)
    })
  }

  loginUser(){
    let formValues = this.userLoginForm.value
     this.loginSerice.createLoginForm(formValues).subscribe(({message,token,data,result}:any)=>{
       this.toaster[data ? 'success' : 'error'](message);
       const payLoad = {token:token,userData:result};
       this.loginSerice.saveLoginTokenToLocalStorage(payLoad);
       this.token = token;
       this.role = result.role;
       if(token === undefined){
        this.Router.navigate(['/home']);
        this.loginSerice.deleteLoginTokenFromLocalStorage()
       }
       else if(this.role === 'super-admin'){
        this.Router.navigate(['./super-admin-portal/admin-dashboard']);;
      }
      else if(this.role === 'user'){
        this.Router.navigate(['./user-portal/user-dashboard']);
      }
      else if(this.role === 'admin'){
        this.Router.navigate(['./admin']);
      }
      else if(this.role === 'employee'){
        this.Router.navigate(['./employee']);
      }
      else if(this.role === 'manager'){
        this.Router.navigate(['./manager']);
      }
     })
  }


  // enterOptCode(){
  //   if(this.role === 'admin'){
  //     this.Router.navigate(['./admin-portal/admin-dashboard']);
  //   }else if(this.role === 'user'){
  //     this.Router.navigate(['./user-portal/user-dashboard']);
  //   }
  // }

}
