import { UmbrellaCompanyManagementService } from '../../../shared-portal/services/umbrella-company-management.service';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  Url = 'https://www.humanoidcrm.com'
  // Url = 'http://localhost:4444'
  public companyId:any;


  constructor(
    private Router:Router,
    private readonly formBuilder:FormBuilder,
    private readonly umbrellaFormService:UmbrellaCompanyManagementService,
    private readonly ToastrService: ToastrService
    ){
    Router.events.forEach((event:any) => {
      if (event instanceof NavigationStart) {
        this.showHead = (event.url.includes('/pay-slip') || event.url.includes('/pay-slip/') ||  event.url.includes('/super-admin-portal/more-apps/pay-slip/'))  ? false : true;
      }
    });
   
  }
  ngOnInit(): void {
    this.intializeForm()
    this.getAllUmbrellaCompanyData()
  }


  getUmbrellaCompany(companyName:any){
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
    this.umbrellaFormService.getUmbrellaCompanyFormData().subscribe((res:any)=>{
      this.getAllFormdata = res.result
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


// Copy code
// constructor(private Router: Router) {
//     Router.events.forEach(event => {
//         if (event instanceof NavigationStart) {
//             const routes = ['/pay-slip', '/pay-slip/', '/admin-portal/more-apps/pay-slip/'];
//             this.showHead = !routes.some(route => event.url.includes(route));
//         }
//     });
// }
// This way you can avoid repetitive event.url.includes() calls and also make the code more readable.
// You can also move the routes array out of the constructor as it is not supposed to change, that way it will be more readable.

// Copy code
// export class MoreAppsComponent {
//   showHead:boolean = true;
//   routes = ['/pay-slip', '/pay-slip/', '/admin-portal/more-apps/pay-slip/'];
//   constructor(private Router:Router){
//     Router.events.forEach((event) => {
//       if (event instanceof NavigationStart) {
//         this.showHead = !this.routes.some(route => event.url.includes(route));
//       }
//     });
//   }
// }



// Abdul Rehman
// simplify code
// export class MoreAppsComponent {
//   showHead:boolean = true;
//   constructor(private Router:Router){
//     Router.events.forEach((event:any) => {
//       if (event instanceof NavigationStart || event?.routerEvent instanceof NavigationEnd) {
//         console.log(event)
//         this.showHead = (event.url.includes('/pay-slip') || event.url.includes('/pay-slip/') ||  event.url.includes('/admin-portal/more-apps/pay-slip/')) ? false : true;
//       }
//     });
//   }
// }
// You can simplify the code by using the Array.prototype.some() method and also using event.url instead of event.routerEvent.url

// Copy code
// constructor(private Router: Router) {
//     Router.events.forEach(event => {
//         if (event instanceof NavigationStart || event instanceof NavigationEnd) {
//             const routes = ['/pay-slip', '/pay-slip/', '/admin-portal/more-apps/pay-slip/'];
//             this.showHead = !routes.some(route => event.url.includes(route));
//         }
//     });
// }
// This way you can avoid repetitive event.url.includes() calls and also make the code more readable.

// You can also move the routes array out of the constructor as it is not supposed to change, that way it will be more readable.

// Copy code
// export class MoreAppsComponent {
//   showHead:boolean = true;
//   routes = ['/pay-slip', '/pay-slip/', '/admin-portal/more-apps/pay-slip/'];
//   constructor(private Router:Router){
//     Router.events.forEach((event) => {
//       if (event instanceof NavigationStart || event instanceof NavigationEnd) {
//         this.showHead = !this.routes.some(route => event.url.includes(route));
//       }
//     });
//   }
// }
// Also, you don't have to use any type for event as it is already defined as RouterEvent in Router module of Angular.