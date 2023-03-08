import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { register } from 'swiper/element';
import Swiper, { Navigation, Pagination } from 'swiper';


register();
Swiper.use([Navigation, Pagination]);

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  swiperEl: any;

  constructor() {}

  ngAfterViewInit() {
    console.log(this.swiperEl)
    this.swiperEl = document.querySelector('#textbooks'); //swiper-container
    console.log(this.swiperEl)
    const swiperParams = {
      // slidesPerView: 1,
      slidesPerGroup:3,
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
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints:{
        0: {
            slidesPerView: 3,
        },
        600: {
            slidesPerView: 3,
        },
        950: {
            slidesPerView: 4,
        },
        1500: {
          slidesPerView: 4,
        },
    },

    }

    Object.assign(this.swiperEl, swiperParams);

    this.swiperEl.initialize();
  }
}
