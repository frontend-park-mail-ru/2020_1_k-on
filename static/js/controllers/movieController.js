import MovieView from 'views/movieView/movieView';
import EventBus from 'libs/eventBus';
import {GLOBAL_EVENTS, MOVIE_EVENTS} from 'libs/constants';

export default class MovieController {
    constructor(router, eventBus, type) {
        this.type = type;
        this.globalEventBus = eventBus;
        this.eventBus = new EventBus();

        this.eventBus.subscribe(MOVIE_EVENTS.internalError, (code) => {
            this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
        });

        this.view = new MovieView(eventBus, type);
    }
}
