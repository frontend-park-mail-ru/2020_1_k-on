import Component from 'components/component';
import template from './swiperComponent.tmpl.xml';
import {SLIDER_DISTANCE} from 'libs/constants';

export default class SwiperComponent extends Component {
    constructor(elements = []) {
        super(template);

        this.element = document.createElement('div');
        this.element.classList.add('swiper');

        this.elements = elements;
    }

    afterRender() {
        const swiperWrapper = this.element.getElementsByClassName('swiper__wrapper')[0];
        this.elements.forEach((elem) => (swiperWrapper.appendChild(elem)));

        this.element.getElementsByClassName('swiper__arrows_left')[0]
            .addEventListener('click', () => {
                swiperWrapper.scrollLeft -= SLIDER_DISTANCE;
            });

        this.element.getElementsByClassName('swiper__arrows_right')[0]
            .addEventListener('click', () => {
                swiperWrapper.scrollLeft += SLIDER_DISTANCE;
            });
    }
}
