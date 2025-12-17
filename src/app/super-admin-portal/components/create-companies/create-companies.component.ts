import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.css']
})
export class CreateCompaniesComponent implements OnInit {

  umbrellaForm: FormGroup | any;
  umbrellaCompanyImage: String | any;
  getAllFormdata: any = [];

  constructor(

    private readonly formBuilder: FormBuilder,
    private readonly umbrellaFormService: UmbrellaCompanyManagementService,
    private readonly ToastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.intializeForm()
  }

  intializeForm() {
    this.umbrellaForm = this.formBuilder.group({
      companyName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]*$/)]),
      companyEmail: new FormControl('', [Validators.required, Validators.email]),
      companyDirector: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern(/^[A-Za-z\s]*$/)]),
      companyNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      companyWebsiteUrl: new FormControl('', [Validators.required, Validators.pattern('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$')]),
      companyLogo: new FormControl('', Validators.required),
    })
  }

  getImage(event: any) {
    this.umbrellaCompanyImage = event.target.files[0];
  }

  submitForm() {

    let multiPartFormData = new FormData();
    multiPartFormData.append('companyNameForEmail', this.umbrellaForm.get('companyName').value.replace(/\b\w/g, (c: any) => c.toUpperCase()));
    multiPartFormData.append('companyName', this.umbrellaForm.get('companyName').value.toLowerCase().replace(/\s/g, ""));
    multiPartFormData.append('companyDirector', this.umbrellaForm.get('companyDirector').value);
    multiPartFormData.append('companyEmail', this.umbrellaForm.get('companyEmail').value);
    multiPartFormData.append('companyNumber', this.umbrellaForm.get('companyNumber').value);
    multiPartFormData.append('companyWebsiteUrl', this.umbrellaForm.get('companyWebsiteUrl').value);
    multiPartFormData.append('companyLogo', this.umbrellaCompanyImage);
    this.umbrellaFormService.sendUmbrellaCompanyForm(multiPartFormData).subscribe(({ message, data }: any) => {
      this.ToastrService[data ? 'success' : 'error'](message);
      this.umbrellaForm.reset();
    })

  }
}
