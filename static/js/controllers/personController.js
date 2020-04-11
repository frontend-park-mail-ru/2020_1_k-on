import PersonView from 'views/personView/personView';
import EventBus from 'libs/eventBus';
import {GLOBAL_EVENTS, PERSON_EVENTS} from 'libs/constants';

export default class PersonController {
    constructor(router, eventBus,) {
        this.globalEventBus = eventBus;
        this.eventBus = new EventBus();

        this.eventBus.subscribe(PERSON_EVENTS.internalError, (code) => {
            this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
        });

        this.view = new PersonView(eventBus);
    }
}
