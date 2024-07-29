import { Component, OnInit, HostListener  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  CAROUSEL_BREAKPOINT = 768;
  carouselDisplayMode = 'multiple';

  constructor(public router: Router) { }
  cards = [
    {
      img: './assets/gallary-image1.png'
    },
    {
      img: './assets/gallary-image2.png'
    },
    {
      img: './assets/gallary-image3.png'
    },
    {
      img: './assets/gallary-image1.png'
    },
    {
      img: './assets/gallary-image2.png'
    },
    {
      img: './assets/gallary-image3.png'
    },
  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  allProduct(){
    this.router.navigate(['/all-product']);
  }
  ngOnInit(): void {
    this.slides = this.chunk(this.cards, 3);
  }
  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }
}
