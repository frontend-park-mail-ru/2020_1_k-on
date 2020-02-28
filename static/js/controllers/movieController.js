import MovieView from '../views/movieView/movieView';

export default class MovieController {
    constructor(router) {
        this.view = new MovieView(router);
    }
}
