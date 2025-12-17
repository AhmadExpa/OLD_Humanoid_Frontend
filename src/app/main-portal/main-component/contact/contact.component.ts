import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  public contactForm: any|FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private toaster:ToastrService
    ) { 
    this.initializeMyLoginForm()
    
  }

  initializeMyLoginForm(){
    this.contactForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      Subject: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      message: new FormControl('', [Validators.required, Validators.maxLength(500)])
    })
  }

  submitContactForm(){
    const value = this.contactForm.value
    // console.log(value);
    // this.toaster.success('contact is on console')
  }

}
