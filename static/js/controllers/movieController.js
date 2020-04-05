import MovieView from 'views/movieView/movieView';

export default class MovieController {
    constructor(router, eventBus, type) {
        this.type = type;
        this.view = new MovieView(eventBus, type);
    }
}
