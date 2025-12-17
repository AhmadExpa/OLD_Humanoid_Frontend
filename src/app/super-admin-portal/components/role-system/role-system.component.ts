import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgencyService } from 'src/app/shared-portal/services/agency-services/agency.service';
import { DynamicMenuService } from 'src/app/shared-portal/services/dynamic-menu/dynamic-menu.service';
import { LoginService } from 'src/app/shared-portal/services/login-api/login.service';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';

@Component({
  selector: 'app-role-system',
  templateUrl: './role-system.component.html',
  styleUrls: ['./role-system.component.css']
})
export class RoleSystemComponent implements OnInit {

  @ViewChild('FileSelect') FileSelect: ElementRef | any;

  public menuList:any = [];
  public roleSystemForm: any | FormGroup;
  public token:any;
  public agenciesData:any = [];
  public companies:any = [];
  public canEdit:any;

  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly ToastrService: ToastrService,
    private readonly DynamicMenuService: DynamicMenuService,
    private readonly LoginService:LoginService,
    private readonly AgencyService:AgencyService,
    private readonly UmbrellaCompanyManagementService:UmbrellaCompanyManagementService
  ) {
    this.roleSystemFormIntialization();
  }

  ngOnInit(): void {
    this.menuList = this.DynamicMenuService.getMenu().map((item: any) => ({ title: item.title, allow:false }));
    this.getAllAgencies();
  }

  public getAllAgencies():any{
    this.UmbrellaCompanyManagementService.getUmbrellaCompanyFormData().subscribe(({message,result,data}:any) => {
      this.agenciesData = result.map((item: any) => ({ companyName: item.companyName, allow:false }));
    })
  }


  roleSystemFormIntialization() {
    this.roleSystemForm = this.formbuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]),
    })
  }

  assignRoles(event: any) {
    let isChecked = event.target.checked;
    this.menuList.forEach((item: any) => {
      if (item.title === event.target.value) {
        item.allow = isChecked;
      }
    });
  }

  assignCompanies(event:any){
    let isChecked = event.target.checked;
    this.agenciesData.forEach((item: any) => {
      if (item.companyName === event.target.value) {
        item.allow = isChecked;
      }
    });
  }

  assignEditRights(event:any) {
    this.canEdit = event.target.checked;
  }

  submitRoleSystemForm() {
    const formValues = {
      ...this.roleSystemForm.value,
      canAccess: this.menuList,
      role: 'user',
      canAccessCompany:this.agenciesData,
      canEdit:this.canEdit
    };
    
    this.LoginService.registerUser(formValues).subscribe(({message,result,data}:any)=>{
      this.ToastrService[data ? 'success' : 'error'](message);
    })
  }

}

