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
                console.error(`${err.status}: FAILED TO LOAD MAIN SLIDER`);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });

        Api.getIndex(window.sessionStorage.getItem('isUserAuth') === 'true')
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.renderSubscriptions(res.body === null ? [] : res.body);
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO LOAD MAIN PLAYLISTS`);
                this.eventBus.publish(INDEX_EVENTS.internalError, err.status);
            });
    }

    renderSubscriptions(subsList = []) {
        subsList.forEach((subItem) => {
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
                isUserSubscribed: subItem.isSubscribed,
                id: subItem.id,
                eventBus: this.eventBus,
            });

            const collectionsElem = this.root.getElementsByClassName('collections')[0];
            collectionsElem.appendChild(collectionComponent.render());
        });
    }

    close() {
        this.slider?.close();
        super.close();
    }
}
