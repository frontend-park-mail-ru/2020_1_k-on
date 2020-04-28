import Component from 'components/component';
import template from './tabComponent.tmpl.xml';
import EventBus from 'libs/eventBus';
import {PLAYLIST_EVENTS} from 'libs/constants';

export default class TabComponent extends Component {
    /**
     *
     * @param {string} name
     * @param {int} id
     * @param {EventBus} eventBus
     */
    constructor({
        name= '',
        id= 0,
        eventBus = new EventBus(),
    } = {}) {
        super(template, eventBus);

        this.data.name = name;

        this.element = document.createElement('div');
        this.element.classList.add('tab');
        this.element.dataset.id = id.toString();
    }

    afterRender() {
        this.element.addEventListener('click', this.onClick.bind(this));
        this.element.getElementsByClassName('tab__delete')[0]
            .addEventListener('click', this.onDelete.bind(this));
    }

    onClick(event) {
        if (event.target.classList.contains('tab_active')) {
            return;
        }

        TabComponent.setActive(event.target);
        this.eventBus.publish(PLAYLIST_EVENTS.clickTab, event.target);
    }

    onDelete(event) {
        event.stopPropagation();
        this.eventBus.publish(PLAYLIST_EVENTS.deleteTab, this.element);
    }

    static setActive(tab) {
        tab.classList.add('tab_active');
        tab.getElementsByClassName('tab__delete')[0].classList.add('tab__delete_active');
    }
}
