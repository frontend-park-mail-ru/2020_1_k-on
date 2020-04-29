import Component from 'components/component';
import template from './sliderComponent.tmpl.xml';
import {SLIDER_INTERVAL} from 'libs/constants';

export default class SliderComponent extends Component {
    constructor(data = {}) {
        super(template);

        this.data = data;

        this.element = document.createElement('div');
        this.element.classList.add('main-slider');
    }

    afterRender() {
        this.slides = this.element.getElementsByClassName('main-slider__wrapper');

        this.curIndex = 0;

        this.curSlide = this.slides[this.curIndex];
        this.curSlide.classList.remove('hidden');

        this.element.getElementsByClassName('main-slider__arrows_left')[0]
            .addEventListener('click', this.doSlide.bind(this, 'left'));

        this.element.getElementsByClassName('main-slider__arrows_right')[0]
            .addEventListener('click', this.doSlide.bind(this, 'right'));

        this.slideInterval = setInterval(this.doSlide.bind(this), SLIDER_INTERVAL, 'right');
    }

    doSlide(direction) {
        this.curSlide.classList.add('hidden');

        const offset = direction === 'left' ? -1 : 1;
        this.curIndex =
            (this.curIndex + offset) % this.slides.length;
        if (this.curIndex === -1) {
            this.curIndex = this.slides.length - 1;
        }
        this.curSlide = this.slides[this.curIndex];
        this.curSlide.classList.remove('hidden');
    }

    close() {
        clearInterval(this.slideInterval);
    }
}
