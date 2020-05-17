import SearchView from 'views/searchView/searchView';
import EventBus from 'libs/eventBus';

export default class SearchController {
    constructor(router, eventBus) {
        this.globalEventBus = eventBus;
        this.eventBus = new EventBus();

        this.view = new SearchView(this.eventBus);
    }
}
