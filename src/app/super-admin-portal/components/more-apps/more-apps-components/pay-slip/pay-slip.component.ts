import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.css']
})
export class PaySlipComponent {
  
  public companyName:any;
  
  constructor(private readonly ActivatedRoute:ActivatedRoute){
    this.ActivatedRoute.paramMap.subscribe((params:any) => {
      this.companyName = params.params.Id;
    });
  }
}
