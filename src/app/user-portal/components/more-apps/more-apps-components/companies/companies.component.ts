import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UmbrellaCompanyManagementService } from 'src/app/shared-portal/services/umbrella-company-management.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit{

  public companyData:any = [];
  public url:String = '' 
  constructor(
    private readonly UmbrellaCompanyManagementService:UmbrellaCompanyManagementService,
    private readonly ToastrService:ToastrService
  ){

  }

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(){
    this.UmbrellaCompanyManagementService.getUmbrellaCompanyFormData().subscribe((res:any) => {
      this.companyData = res.result;
    })
  }
  
}
