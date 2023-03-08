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
      nextEl: ".fa-chevron-right",
      prevEl: ".fa-chevron-left",
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

  const nextButton: any = document.querySelector('.next-slide-button');
  const prevButton: any = document.querySelector('.prev-slide-button');

  console.log(nextButton)
  console.log(prevButton)

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
    console.log('ee')
  });
  prevButton.addEventListener('click', () => {
    // this.swiperEl.slidePrev();
  });
  }
}
