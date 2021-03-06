import Component from 'components/component';
import template from './collectionComponent.tmpl.xml';
import Api from 'libs/api';
import EventBus from 'libs/eventBus';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import {
    SUBSCRIPTIONS_EVENTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class CollectionComponent extends Component {
    constructor({
        name = 'collection',
        elements = [],
        isPlaylist = false,
        id = 0,
        isUserSubscribed = false,
        eventBus = new EventBus(),
        isCropped = false,
        type = 'films',
    } = {}) {
        super(template, eventBus);

        this.data = {
            name: name,
            isPlaylist: isPlaylist,
            id: id,
            isUserAuth: window.sessionStorage.getItem('isUserAuth') === 'true',
            isUserSubscribed: isUserSubscribed,
            isCropped: isCropped,
            type: type,
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

        this.subButton.addEventListener('click', this.onSubButtonClick.bind(this));
    }

    onSubButtonClick() {
        if (this.subButton.textContent === 'Подписаться') {
            Api.subscribeToPlaylist(this.subButton.dataset.id)
                .then((res) => {
                    if (res.status === SUCCESS_STATUS) {
                        this.subButton.textContent = 'Отписаться';
                        this.subButton.classList.replace(
                            'collection__subscribe-button_sub',
                            'collection__subscribe-button_unsub'
                        );
                    } else {
                        console.error(`${res.status} : FAILED TO SUBSCRIBE`);
                    }
                });
        } else {
            Api.unsubscribeFromPlaylist(this.subButton.dataset.id)
                .then((res) => {
                    if (res.status === SUCCESS_STATUS) {
                        this.subButton.textContent = 'Подписаться';
                        this.eventBus.publish(SUBSCRIPTIONS_EVENTS.unsubscribe, this.element);
                        this.subButton.classList.replace(
                            'collection__subscribe-button_unsub',
                            'collection__subscribe-button_sub'
                        );
                    } else {
                        console.error(`${res.status} : FAILED TO UNSUBSCRIBE`);
                    }
                });
        }
    }
}
