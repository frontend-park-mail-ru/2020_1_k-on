import template from './swiperComponent.tmpl.xml';
import {SLIDER_DISTANCE} from 'libs/constants';

export default class SwiperComponent {
    constructor(elements = []) {
        this.tmpl = template;
        this.elements = elements;
    }

    render() {
        this.swiper = document.createElement('div');
        this.swiper.classList.add('swiper');
        this.swiper.innerHTML += this.tmpl();

        this.swiperWrapper = this.swiper.getElementsByClassName('swiper__wrapper')[0];
        this.elements.forEach((elem) => (this.swiperWrapper.appendChild(elem)));

        this.addListeners();

        return this.swiper;
    }

    addListeners() {
        const leftArrow = this.swiper.getElementsByClassName(
            'swiper__arrows_left'
        )[0];
        const rigthArrow = this.swiper.getElementsByClassName(
            'swiper__arrows_right'
        )[0];
        leftArrow.addEventListener('click', () => {
            this.swiperWrapper.scrollLeft -= SLIDER_DISTANCE;
        });
        rigthArrow.addEventListener('click', () => {
            this.swiperWrapper.scrollLeft += SLIDER_DISTANCE;
        });
    }
}
