import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  
  public userLoginForm : FormGroup | any;
  constructor(
    private readonly FormBuilder:FormBuilder
  ) { 
    this.userLoginFormModel();
  }

  ngOnInit(): void {
  }

  userLoginFormModel() {
    this.userLoginForm = this.FormBuilder.group({
      userName: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
  }

  loginUser(){

  }
  
}
