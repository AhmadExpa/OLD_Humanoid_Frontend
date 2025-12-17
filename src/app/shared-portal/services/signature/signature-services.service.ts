import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignatureServicesService {

  public phoneNumber:any | null = null;

  constructor(private HttpClient:HttpClient) { 
    
  }

 

  private phoneNumberSubject = new Subject<any>();

  setPhoneNumber(phoneNumber: any) {
    this.phoneNumber = phoneNumber;
    this.phoneNumberSubject.next(this.phoneNumber);
  }
  
  getPhoneNumberFromLeadComponent(): Observable<any> {
    return this.phoneNumberSubject.asObservable();
  }


  checkSignatureStatus(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/signatureImageManagement/checkSignaturePDFStatus`,payLoad)
  }
  verfiedSignatureStatus(payLoad:any){
    return this.HttpClient.post(`${environment.base_url}/signatureImageManagement/verfiedSignatureStatus`,payLoad)
  }
   sendSignatureEmail(payload:any){
    return this.HttpClient.post(`${environment.base_url}/signatureImageManagement/sendSignatureEmail`,payload)
   }

}
