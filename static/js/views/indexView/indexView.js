import View from 'views/view';
import template from './indexView.tmpl.xml';
import Api from 'libs/api';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import SliderComponent from 'components/sliderComponent/sliderComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import {
    INDEX_EVENTS,
    RANDOM_SHUFFLE_VALUE,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class IndexView extends View {
    constructor(eventBus) {
        super(template, eventBus);
    }

    render(root) {
        super.render(root);

        Api.getIndex()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.collections = res.body.collections;
                this.recommendations = res.body.recommendations;
                this.afterRender();
            })
            .catch((err) => {
                console.log(err);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });
    }

    afterRender() {
        this.slider = new SliderComponent(this.recommendations);
        this.slider.render(this.root.getElementsByClassName('main-slider')[0]);

        this.collections.map((collection) => {
            collection.list.sort(() => Math.random() - RANDOM_SHUFFLE_VALUE);
        });

        const collectionsElem = this.root.getElementsByClassName('collections')[0];

        this.collections.forEach((collection) => {
            const cards = collection.list.map((item) => {
                const cardComponent = new CardComponent(item);
                return cardComponent.render();
            });

            const collectionComponent = new CollectionComponent({
                name: collection.name,
                elements: cards,
            });

            collectionsElem.appendChild(collectionComponent.render());
        });
    }

    close() {
        this.slider.close();
        super.close();
    }
}
