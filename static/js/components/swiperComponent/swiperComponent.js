import template from './swiperComponent.tmpl.xml';
import {SLIDER_DISTANCE} from 'libs/constants';

export default class SwiperComponent {
    constructor(data) {
        this.tmpl = template;
        this.data = data;
    }

    render(root) {
        this.root = root;

        this.collection = document.createElement('div');
        this.collection.classList.add('collection');
        this.collection.innerHTML += this.tmpl(this.data);

        this.swiper = this.collection.getElementsByClassName(
            'swiper__wrapper'
        )[0];

        this.addListeners();

        this.root.appendChild(this.collection);
    }

    addListeners() {
        const leftArrow = this.collection.getElementsByClassName(
            'swiper__arrows_left'
        )[0];
        const rigthArrow = this.collection.getElementsByClassName(
            'swiper__arrows_right'
        )[0];
        leftArrow.addEventListener('click', () => {
            this.swiper.scrollLeft -= SLIDER_DISTANCE;
        });
        rigthArrow.addEventListener('click', () => {
            this.swiper.scrollLeft += SLIDER_DISTANCE;
        });
    }
}
