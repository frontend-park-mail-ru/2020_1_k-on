import SearchView from 'views/searchView/searchView';
import EventBus from 'libs/eventBus';
import {GLOBAL_EVENTS, SEARCH_EVENTS} from 'libs/constants';

export default class SearchController {
    constructor(router, eventBus) {
        this.globalEventBus = eventBus;
        this.eventBus = new EventBus();

        this.eventBus.subscribe(SEARCH_EVENTS.internalError,
            (code) => {
                this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
            }
        );

        this.view = new SearchView(this.eventBus);
    }
}
