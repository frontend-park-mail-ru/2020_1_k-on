import template from './sliderComponent.tmpl.xml';
import {SLIDER_INTERVAL} from 'libs/constants';

export default class SliderComponent {
    constructor(data) {
        this.tmpl = template;
        this.data = data;
    }

    render(root) {
        this.root = root;

        this.slider = document.createElement('div');
        this.slider.classList.add('main-slider');
        this.slider.innerHTML += this.tmpl(this.data);

        this.slides = this.slider.getElementsByClassName(
            'main-slider__wrapper'
        );

        this.curIndex = 0;

        this.curSlide = this.slides[this.curIndex];
        this.curSlide.classList.remove('hidden');

        this.leftArrow = this.slider.getElementsByClassName(
            'main-slider__arrows_left'
        )[0];
        this.leftArrow.addEventListener(
            'click', this.doSlide.bind(this, 'left')
        );

        this.rightArrow = this.slider.getElementsByClassName(
            'main-slider__arrows_right'
        )[0];
        this.rightArrow.addEventListener(
            'click', this.doSlide.bind(this, 'right')
        );

        this.slideInterval = setInterval(
            this.doSlide.bind(this),
            SLIDER_INTERVAL,
            'right'
        );

        this.root.appendChild(this.slider);
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
