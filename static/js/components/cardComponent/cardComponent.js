import Component from 'components/component';
import template from './cardComponent.tmpl.xml';
import EventBus from 'libs/eventBus';
import {PLAYLIST_EVENTS} from 'libs/constants';

export default class CardComponent extends Component {
    constructor({
        type = 'films',
        id = '1',
        image = '',
        russianName = null,
        ageLimit = 0,
        year = null,
        country = null,
        mainGenre = null,
        yearFirst = null,
        yearLast = null,
        isRemovable = false,
        eventBus = new EventBus(),
    } = {}) {
        super(template, eventBus);

        this.id = id;

        this.data = {
            type: type,
            image: image,
            russianName: russianName,
            ageLimit: ageLimit,
            year: year,
            country: country,
            mainGenre: mainGenre,
            yearFirst: yearFirst,
            yearLast: yearLast,
            isRemovable: isRemovable,
        };

        this.element = document.createElement('a');
        this.element.classList.add('series-card');
        this.element.href = `/${this.data.type}/${this.id}`;
    }

    afterRender() {
        if (!this.data.isRemovable) {
            return;
        }

        this.element.getElementsByClassName('series-card__remove')[0].addEventListener(
            'click',
            this.onRemove.bind(this),
        );
    }

    onRemove(event) {
        event.stopPropagation();
        event.preventDefault();

        this.eventBus.publish(PLAYLIST_EVENTS.deleteCard, this.element, this.id, this.data.type);
    }
}
