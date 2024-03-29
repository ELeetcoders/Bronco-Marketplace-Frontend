import { Component, ViewChild, AfterViewInit, Input, ChangeDetectorRef } from '@angular/core';
import { register } from 'swiper/element';
import Swiper, { Navigation, Pagination } from 'swiper';
import { Product } from 'src/app/models/Product';
import { PRODUCTS } from 'src/app/mock-products';


register();
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  @Input() category: string;
  @Input() products: Product[];

  swiperEl: any;
  swiperParams: any

  constructor(private cd: ChangeDetectorRef) {}

  ngOnChanges() {
    console.log('okieeeee')
    //this.cd.detectChanges()
    // Object.assign(this.swiperEl, this.swiperParams);
    // this.swiperEl.initialize()
    //this.swiperEl.update()
  }

  ngAfterViewInit() {
    //console.log(this.swiperEl)
    this.swiperEl = document.querySelector('#'+this.category); //swiper-container
    //console.log(this.swiperEl)
    const swiperParams = {
      // slidesPerView: 1,
      slidesPerGroup:3,
      spaceBetween: 10,
    // spaceBetween: 25,
    //loop: true,
    // centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".fa-chevron-right." + this.category,
      prevEl: ".fa-chevron-left." + this.category,
    },
    breakpoints:{
        0: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        600: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        950: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1500: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
    },

    }

    Object.assign(this.swiperEl, swiperParams);

    this.swiperEl.initialize();

  const nextButton: any = document.querySelector('.next-slide-button.' + this.category);
  const prevButton: any = document.querySelector('.prev-slide-button.' + this.category);

  // console.log(nextButton)
  // console.log(prevButton)

  this.swiperEl.on('slideChange', () => {

    if (this.swiperEl.isBeginning) {
      prevButton.classList.add('swiper-button-disabled');
    } else {
      prevButton.classList.remove('swiper-button-disabled');
    }

    if (this.swiperEl.isEnd) {
      nextButton.classList.add('swiper-button-disabled');
    } else {
      nextButton.classList.remove('swiper-button-disabled');
    }
  });

  nextButton.addEventListener('click', () => {
    // this.swiperEl.slideNext();
    //console.log('ee')
  });
  prevButton.addEventListener('click', () => {
    // this.swiperEl.slidePrev();
  });
  }

}
