import movieView from '../views/movieView';

export default class MovieController {
    view = movieView;

    render() {
        const container = document.getElementById('container');
        container.innerHTML = '';

        const movieItem = document.createElement('div');
        movieItem.className = 'movie';
        movieItem.innerHTML = this.view;

        container.appendChild(movieItem);
    }
}
