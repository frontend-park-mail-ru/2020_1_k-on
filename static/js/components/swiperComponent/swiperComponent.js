import {SLIDER_DISTANCE} from 'libs/constants';

export default class SwiperComponent {
    constructor(elements = []) {
        this.elements = elements;
    }

    render() {
        const swiper = document.createElement('div');
        swiper.classList.add('swiper');

        this.leftArrow = document.createElement('div');
        this.leftArrow.classList.add('swiper__arrows_left');
        this.rightArrow = document.createElement('div');
        this.rightArrow.classList.add('swiper__arrows_right');

        swiper.appendChild(this.leftArrow);
        swiper.appendChild(this.rightArrow);

        this.swiperWrapper = document.createElement('div');
        this.swiperWrapper.classList.add('swiper__wrapper', 'page-layout');
        this.elements.forEach((elem) => (this.swiperWrapper.appendChild(elem)));

        this.addListeners();

        swiper.appendChild(this.swiperWrapper);

        return swiper;
    }

    addListeners() {
        this.leftArrow.addEventListener('click', () => {
            this.swiperWrapper.scrollLeft -= SLIDER_DISTANCE;
        });
        this.rightArrow.addEventListener('click', () => {
            this.swiperWrapper.scrollLeft += SLIDER_DISTANCE;
        });
    }
}
