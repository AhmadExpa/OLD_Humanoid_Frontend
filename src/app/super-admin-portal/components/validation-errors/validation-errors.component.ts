import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css']
})
export class ValidationErrorsComponent {
  @Input() control!:AbstractControl;
  @Input() customMessages: { [key: string]: string } = {};
  
  ngOnInit(): void {
      // console.log(this.customMessages)
  }
  
  get errorMessage() {
    if (this.control) {
      for (const errorKey in this.control.errors) {
        if (this.control.errors.hasOwnProperty(errorKey) && (this.control.dirty || this.control.touched)) {
          if (this.customMessages[errorKey]) {
            return this.customMessages[errorKey];
          } else {
            return this.defaultErrorMessage(errorKey);
          }
        }
      }
    }
    return null;
  }
  
  private defaultErrorMessage(errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return 'This field is required.';
      case 'pattern':
        return 'This field should match a specific pattern.';
      default:
        return 'Invalid input.';
    }
  }
}
