import { UmbrellaCompanyManagementService } from './../../../shared-portal/services/umbrella-company-management.service';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageManagementService } from 'src/app/shared-portal/services/local-storage-management.service';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';
@Component({
  selector: 'app-more-apps',
  templateUrl: './more-apps.component.html',
  styleUrls: ['./more-apps.component.css']
})
export class MoreAppsComponent {
  showHead:boolean = true;
  showForm:boolean = false;
  umbrellaForm:FormGroup|any;
  umbrellaCompanyImage:String | any;
  getAllFormdata:any = [];
  Url = ''
  public companyId:any;
  public userRole:any;
  public userData:any;


  constructor(
    private Router:Router,
    private readonly formBuilder:FormBuilder,
    private readonly umbrellaFormService:UmbrellaCompanyManagementService,
    private readonly ToastrService: ToastrService,
    private readonly LocalStorageManagementService:LocalStorageManagementService,
    private readonly LoginService:LoginService
    ){
    Router.events.forEach((event:any) => {
      if (event instanceof NavigationStart) {
        this.showHead = (event.url.includes('/pay-slip') || event.url.includes('/pay-slip/') ||  event.url.includes('/super-admin-portal/more-apps/pay-slip/'))  ? false : true;
      }
    });
    this.intializeForm()
  }

  ngOnInit(): void {
    this.getUserRole();
    this.getAllUmbrellaCompanyData();
  }

  public getUserRole():any{
    const {role} = this.LocalStorageManagementService.getUserRole();
    this.userRole = role;
    this.userData = this.LoginService.getUserData();
  }

  displayForm(){
      this.showForm = true;
  }
  CloseForm(){
    this.showForm = false;
    this.umbrellaForm.reset()
  }

  intializeForm(){
     this.umbrellaForm = this.formBuilder.group({
      companyName: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20),Validators.pattern(/^[A-Za-z\s]*$/)]),
      companyEmail: new FormControl('',[Validators.required, Validators.email]),
      companyDirector: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20),Validators.pattern(/^[A-Za-z\s]*$/)]),
      companyNumber: new FormControl('',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      companyWebsiteUrl: new FormControl('', [Validators.required,Validators.pattern('^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w.-]*)*\\/?$')]),
      companyLogo: new FormControl('',Validators.required),
     })
  }

  getImage(event:any){
    this.umbrellaCompanyImage = event.target.files[0];
  }

  submitForm(){

    let multiPartFormData = new FormData();
    multiPartFormData.append('companyNameForEmail',this.umbrellaForm.get('companyName').value.replace(/\b\w/g, (c:any) => c.toUpperCase()));
    multiPartFormData.append('companyName',this.umbrellaForm.get('companyName').value.toLowerCase().replace(/\s/g, ""));
    multiPartFormData.append('companyDirector',this.umbrellaForm.get('companyDirector').value);
    multiPartFormData.append('companyEmail',this.umbrellaForm.get('companyEmail').value);
    multiPartFormData.append('companyNumber',this.umbrellaForm.get('companyNumber').value);
    multiPartFormData.append('companyWebsiteUrl',this.umbrellaForm.get('companyWebsiteUrl').value);
    multiPartFormData.append('companyLogo', this.umbrellaCompanyImage);
    this.umbrellaFormService.sendUmbrellaCompanyForm(multiPartFormData).subscribe(({message, data}:any)=>{
      this.ToastrService[data ? 'success' : 'error'](message);
      this.umbrellaForm.reset();
      this.getAllUmbrellaCompanyData();
    })

  }

  getAllUmbrellaCompanyData(){
    this.umbrellaFormService.getUmbrellaCompanyFormData().subscribe(({result}:any)=>{
      const { canAccessCompany } = this.userData;
      this.getAllFormdata = result.filter((company:any) => {
        return canAccessCompany.some((allowAccess:any) => {
          return company.companyName === allowAccess.companyName && allowAccess.allow === true;
        });
      });
    })
  }

  activeModal(Id:any){
    this.companyId = Id
  }
  

  deleteCompany(_id:any){
    this.umbrellaFormService.deleteUmbrellaCompany(_id).subscribe(({data,message}:any)=>{
      this.ToastrService[data ? 'error':'error'](message)
      this.getAllUmbrellaCompanyData();
    })
  }

}









function ViewChild(arg0: string) {
  throw new Error('Function not implemented.');
}
