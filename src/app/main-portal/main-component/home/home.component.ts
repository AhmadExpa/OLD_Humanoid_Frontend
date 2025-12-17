import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent {

  @ViewChild('mainContentDiv') mainContentDiv: ElementRef | any;
  @ViewChild('image1') image1: ElementRef | any;
  @ViewChild('image2') image2: ElementRef | any;
  public scrollPosition: number = 0;
  public windowScrollPosition: number = 0;

  public images = [
    'assets/New-Assets/payroll-logo2.jpg',
    'assets/New-Assets/planet-payroll.jpeg',
    'assets/New-Assets/logo.png',
    'assets/New-Assets/forest-umbrella-1 (1).png',
  ];

  public clientReviewData: any = [
    {
      name: "Salman",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
      ],
      description: "The device has a clean design, and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at",
      reviewDate: "26-09-2023"
    },
    {
      name: "Abdul",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-half-star",
      ],
      description: "The device has a clean design, and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at",
      reviewDate: "26-09-2023"
    },
    {
      name: "Ali",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
      ],
      description: "The device has a clean design, and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at",
      reviewDate: "26-09-2023"
    },
    {
      name: "Zubair",
      stars: [
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
      ],
      description: "The device has a clean design, and the metal housing feels sturdy in my hands. Soft rounded corners make it a pleasure to look at",
      reviewDate: "26-09-2023"
    },
  ]

  constructor(private renderer: Renderer2) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    this.windowScrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // console.log('Scroll Position:', this.windowScrollPosition);
  }

  ngAfterViewInit() {
    // Check if ViewChild elements exist
    if (this.mainContentDiv && this.image1 && this.image2) {
      this.renderer.setStyle(this.image2.nativeElement, 'display', 'none');
      // Add a scroll event listener to the mainContentDiv
      this.mainContentDiv.nativeElement.addEventListener('scroll', () => {
        // Get the scroll position
        this.scrollPosition = this.mainContentDiv.nativeElement.scrollTop;
        console.log('Scroll Position:', this.scrollPosition);

        // Check if scroll position is greater than or equal to 600
        if (this.scrollPosition === 0) {
          // Hide image1
          this.renderer.setStyle(this.image1.nativeElement, 'display', 'block');
          // Show image2
          this.renderer.setStyle(this.image2.nativeElement, 'display', 'none');
          // // Show image3
          // this.renderer.setStyle(this.image3.nativeElement, 'display', 'none');
        } else if (this.scrollPosition >= 610) {
          // Show image1
          this.renderer.setStyle(this.image1.nativeElement, 'display', 'none');
          // Hide image2
          this.renderer.setStyle(this.image2.nativeElement, 'display', 'block');
          // // Hide image3
          // this.renderer.setStyle(this.image3.nativeElement, 'display', 'none');
        }
      });
    }
  }

}

