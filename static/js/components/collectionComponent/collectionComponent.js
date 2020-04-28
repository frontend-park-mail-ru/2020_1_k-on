import SwiperComponent from 'components/swiperComponent/swiperComponent';
import Component from 'components/component';
import template from './collectionComponent.tmpl.xml';
import Api from 'libs/api';
import {
    SUBSCRIPTIONS_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';
import EventBus from 'libs/eventBus';

export default class CollectionComponent extends Component {
    constructor({
        name = 'collection',
        elements = [],
        isPlaylist = false,
        id = 0,
        isUserSubscribed = false,
        eventBus = new EventBus(),
    } = {}) {
        super(template, eventBus);

        this.data = {
            name: name,
            isPlaylist: isPlaylist,
            id: id,
            isUserAuth: window.sessionStorage.getItem('isUserAuth') === 'true',
            isUserSubscribed: isUserSubscribed,
        };

        this.elements = elements;

        this.element = document.createElement('div');
        this.element.classList.add('collection');
    }

    afterRender() {
        const swiperComponent = new SwiperComponent(this.elements);
        this.element.appendChild(swiperComponent.render());

        if (!this.data.isPlaylist || !this.data.isUserAuth) {
            return;
        }

        this.subButton = this.element.getElementsByClassName('collection__subscribe-button')[0];

        if (this.subButton.textContent === 'Отписаться') {
            this.subButton.classList.add('collection__subscribe-button_err');
        }

        this.subButton.addEventListener('click', this.onSubButtonClick.bind(this));
    }

    onSubButtonClick() {
        if (this.subButton.textContent === 'Подписаться') {
            Api.subscribeToPlaylist(this.subButton.dataset.id)
                .then((res) => {
                    if (res.status === SUCCESS_STATUS) {
                        this.subButton.textContent = 'Отписаться';
                        this.subButton.classList.add('collection__subscribe-button_err');
                    }
                });
        } else {
            Api.unsubscribeFromPlaylist(this.subButton.dataset.id)
                .then((res) => {
                    if (res.status === SUCCESS_STATUS) {
                        this.subButton.textContent = 'Подписаться';
                        this.eventBus.publish(SUBSCRIPTIONS_EVENTS.unsubscribe, this.element);
                        this.subButton.classList.remove('collection__subscribe-button_err');
                    }
                });
        }
    }
}
