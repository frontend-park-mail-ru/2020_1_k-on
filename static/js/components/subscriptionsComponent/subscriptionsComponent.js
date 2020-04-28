import Component from 'components/component';
import CardComponent from 'components/cardComponent/cardComponent';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import EventBus from 'libs/eventBus';
import {SUBSCRIPTIONS_EVENTS} from 'libs/constants';

export default class SubscriptionsComponent extends Component {
    constructor(subsList = []) {
        super();

        this.eventBus = new EventBus();
        this.eventBus.subscribe(SUBSCRIPTIONS_EVENTS.unsubscribe, this.onUnsubscribe.bind(this));

        this.subsList = subsList;

        this.element = document.createElement('div');
        this.element.classList.add('subscriptions');
    }

    afterRender() {
        this.subsList.forEach((subItem) => {
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
                isUserSubscribed: true,
                id: subItem.id,
                eventBus: this.eventBus,
            });

            this.element.appendChild(collectionComponent.render());
        });
    }

    onUnsubscribe(playlist) {
        playlist.remove();
    }
}
