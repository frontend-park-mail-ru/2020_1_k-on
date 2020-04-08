import View from 'views/view';
import template from './indexView.tmpl.xml';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import SliderComponent from 'components/sliderComponent/sliderComponent';
import Api from 'libs/api';
import {
    INDEX_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class IndexView extends View {
    constructor(eventBus) {
        super(template, eventBus);
    }

    render(root) {
        this.root = root;

        Api.getIndex()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.data = res.body;
                this.afterFetch();
            })
            .catch((err) => {
                console.log(err);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });
    }

    afterFetch() {
        super.render(this.root);
        this.afterRender();
    }

    afterRender() {
        this.slider = new SliderComponent(this.data.recommendations);
        this.mainSlider = this.root.getElementsByClassName('main-slider')[0];
        this.slider.render(this.mainSlider);

        this.collections = this.root.getElementsByClassName('collections')[0];

        this.data.collections.forEach((colletion) => {
            const swiper = new SwiperComponent(colletion);
            swiper.render(this.collections);
        });
    }

    close() {
        this.slider.close();
        super.close();
    }
}
