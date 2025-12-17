

import { FormControl } from '@angular/forms';

export class FileValidator {

  static validate(control: FormControl): any {
    return !control.value ? { noFileSelected: true } : null;
  }
}