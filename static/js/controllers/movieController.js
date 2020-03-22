import MovieView from 'views/movieView/movieView';

export default class MovieController {
    constructor(router) {
        this.router = router;
        this.view = new MovieView();
    }
}
