import View from 'views/view';
import template from './indexView.tmpl.xml';
import Api from 'libs/api';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import SliderComponent from 'components/sliderComponent/sliderComponent';
import CardComponent from 'components/cardComponent/cardComponent';
import {
    INDEX_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class IndexView extends View {
    constructor(eventBus) {
        super(template, eventBus);
    }

    render(root) {
        super.render(root);

        Api.getSlider()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.slider = new SliderComponent(res.body.recommendations);
                this.root.prepend(this.slider.render());
            })
            .catch((err) => {
                console.log(err);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });

        Api.getIndex()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                }
            })
            .then((res) => {
                this.collections = res.body;
                this.collections = this.collections === null ? [] : this.collections;

                const collectionsElem = this.root.getElementsByClassName('collections')[0];

                this.collections.forEach((subItem) => {
                    subItem.films = subItem.films === null ? [] : subItem.films;
                    subItem.series = subItem.series === null ? [] : subItem.series;
                    const cards = subItem.films.concat(subItem.series).map((cardItem) => {
                        const card = new CardComponent(cardItem);
                        return card.render();
                    });

                    const collectionComponent = new CollectionComponent({
                        name: subItem.name,
                        elements: cards,
                        isPlaylist: true,
                        isUserSubscribed: false,
                        id: subItem.id,
                        eventBus: this.eventBus,
                    });

                    collectionsElem.appendChild(collectionComponent.render());
                });
            })
            .catch((err) => {
                console.log(err);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });
    }

    close() {
        this.slider.close();
        super.close();
    }
}
