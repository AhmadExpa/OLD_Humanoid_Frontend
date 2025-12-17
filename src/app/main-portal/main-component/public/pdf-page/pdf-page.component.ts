import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxExtendedPdfViewerService, NgxExtendedPdfViewerComponent, pdfDefaultOptions, } from 'ngx-extended-pdf-viewer';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationThroughEmailService } from 'src/app/shared-portal/services/registration-through-email/registration-through-email.service';
import SignaturePad from 'signature_pad';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignatureServicesService } from 'src/app/shared-portal/services/signature/signature-services.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LeadManagementService } from 'src/app/shared-portal/services/lead-management/lead-management.service';

@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.css']
})
export class PdfPageComponent implements OnInit {
  @ViewChild(NgxExtendedPdfViewerComponent) private pdfViewer: NgxExtendedPdfViewerComponent | any;
  public pdfSrc: string = '';
  public signedPdfData: any;
  public contractName: string = ''
  public companyName: string = '';
  public contractArray = [
    { name: 'Contract 1', url: 'assets/pdfs/Planet Payroll Limited General Worker Contract ND.pdf.pdf' },
    { name: 'Contract 2', url: 'assets/pdfs/Sweet Umbrella General Worker Contract 1.0.pdf' },
    { name: 'Contract 3', url: 'assets/pdfs/Key Information Document 0.1 (1).pdf' },
  ]
  public index: any = 0;
  public sidebarVisible = true;
  // public phoneNumber:any;

  /** In most cases, you don't need the NgxExtendedPdfViewerService. It allows you
  *  to use the "find" api, to extract text and images from a PDF file,
  *  to print programmatically, and to show or hide layers by a method call.
 */

  // Signature---->

  public signatureNeeded = false;
  public signaturePad: SignaturePad | any;
  @ViewChild('canvas') canvasEl: ElementRef | any;
  public mySignatureForm: FormGroup | any;
  public signatureImageArray = [];
  public submitDetials:boolean = false;

  // Signature---->
  constructor(
    private pdfService: NgxExtendedPdfViewerService,
    private readonly RegisterationThroughEmailService: RegistrationThroughEmailService,
    private readonly signatureServicesService: SignatureServicesService,
    private readonly ActivatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly ToastrService: ToastrService,
    private readonly router:Router
  ) {

    this.imageForm()
    pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
    this.companyName = this.ActivatedRoute.snapshot.paramMap.get('companyName') || '';
    // this.phoneNumber = this.signatureServicesService.getPhoneNumberFromLeadComponent()  // pass any number
    // console.log(this.signatureServicesService.getPhoneNumberFromLeadComponent());

    // this.signatureServicesService.getPhoneNumberFromLeadComponent().subscribe(
    //   phoneNumber => {
    //     this.phoneNumber = phoneNumber;
    //     console.log(this.phoneNumber);
    //   }
    // );
  }
 

  ngOnInit(): void {
    const [firstValue] = this.contractArray;
    this.pdfSrc = firstValue.url;
    this.contractName = `${this.companyName}  ${firstValue.name}`
    console.log(this.companyName);
    this.signatureServicesService.checkSignatureStatus(this.companyName).subscribe((res:any)=>{
      // console.log(res);
    })
  }



  // Signature---->

  imageForm() {
    this.mySignatureForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      position: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
      date: new FormControl('', [Validators.required]),
      image: this.formBuilder.array([]),
      address: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 !@#$%^&*()-_+=|\\{}\[\]:;'",.<>]*$/)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11),Validators.pattern(/^[0-9]*$/)]),
      companyName: new FormControl ('')
    });
   
  
  }


  ngAfterViewInit() {
    if (this.canvasEl) {
      this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    }
  }

 

  startDrawing(event: any) {
    if (this.signaturePad) {
      this.signatureNeeded = true;
    }
  }

  moved(event: any) {
    if (this.signaturePad) {
    }
  }
  get imageFormArray() {
    return this.mySignatureForm.get('image') as FormArray;
  }

  clearPad(event: any) {
    event.preventDefault();
    if (this.signaturePad) {
      this.signaturePad.clear();
      this.signatureNeeded = false;
    }
  }


  submitSignatureForm() {

    this.submitDetials = true;

    if (this.signaturePad) {
      // Save the signature as a base64-encoded image
      this.imageFormArray.push(new FormControl(this.signaturePad.toDataURL()));
    }

    this.signatureImageArray.forEach((element: any) => {
      this.imageFormArray.push(new FormControl(element));
    });

    let multiPartFormData = new FormData();
    this.mySignatureForm.get('companyName').setValue(this.companyName)
    // this.mySignatureForm.get('phoneNumber').setValue(this.phoneNumber)
    // Iterate through each form control in the image FormArray
    this.imageFormArray.controls.forEach((control: FormControl | any, index: number | any) => {
      // Convert the base64 data to a Blob
      const blob = this.dataURItoBlob(control.value);

     
      // create filename
      const fileName = `signature_${index + 1}.png`

      // Append the Blob to FormData with a distinct filename
      multiPartFormData.append('image', blob, fileName);
      multiPartFormData.append('filename', fileName);
      multiPartFormData.append('name',this.mySignatureForm.get('name').value)
      multiPartFormData.append('position',this.mySignatureForm.get('position').value)
      multiPartFormData.append('date',this.mySignatureForm.get('date').value)
      multiPartFormData.append('address',this.mySignatureForm.get('address').value)
      multiPartFormData.append('phoneNumber',this.mySignatureForm.get('phoneNumber').value)
      multiPartFormData.append('companyName', this.companyName);
      
      
    });
    // SendSignatureImageEmail
    this.signatureServicesService.sendSignatureEmail(multiPartFormData).subscribe(
      ({message,data}: any) => {
        this.submitDetials = false
        this.mySignatureForm.reset()
        this.clearPad(event)
        this.ToastrService[data ? 'success' : 'error'](message);
        this.router.navigate(['/submitSignContractPage'])
      },
    );

    this.signatureServicesService.verfiedSignatureStatus(this.companyName).subscribe((res:any)=>{
      console.log(res);
    })

  }


  // Helper function to convert base64 to Blob
  dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/png' });
  }

  forward() {
    if (this.index < 2) {
      // console.log(this.contractArray[this.index+1])
      const loadContract = this.contractArray[this.index + 1];
      this.pdfSrc = loadContract.url;
      this.contractName = `${this.companyName}  ${loadContract.name}`
      this.index++;
    }
  }

  backward() {
    if (this.index > 0) {
      // console.log(this.contractArray[this.index-1])
      const loadContract = this.contractArray[this.index - 1];
      this.pdfSrc = loadContract.url;
      this.contractName = `${this.companyName}  ${loadContract.name}`
      this.index--;
    }
  }
}
