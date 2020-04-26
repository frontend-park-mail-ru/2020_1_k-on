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
        this.swiperWrapper = this.element.getElementsByClassName('swiper__wrapper')[0];

        this.elements.forEach((elem) => (this.swiperWrapper.appendChild(elem)));

        this.element.getElementsByClassName('swiper__arrows_left')[0]
            .addEventListener('click', () => {
                this.swiperWrapper.scrollLeft -= SLIDER_DISTANCE;
            });

        this.element.getElementsByClassName('swiper__arrows_right')[0]
            .addEventListener('click', () => {
                this.swiperWrapper.scrollLeft += SLIDER_DISTANCE;
            });
    }

    insertBeforeLast(elem) {
        this.swiperWrapper.insertBefore(elem, this.swiperWrapper.lastChild);
    }
}
