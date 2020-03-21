import '../css/style.scss';

import LoginController from './controllers/loginController';
import SignUpController from './controllers/signUpController';
import MovieController from './controllers/movieController';
import ProfileController from './controllers/profileController';
import ListController from './controllers/listController';
import Navbar from './components/navbar/navbar';
import Router from './libs/router';
import EventBus from './libs/eventBus';
import View from './views/view';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const container = document.getElementById('container');
    const globalEventBus = new EventBus();
    const navbar = new Navbar(globalEventBus);
    const router = new Router(container);

    const controllers = {
        movie: new MovieController(router),
        signup: new SignUpController(router, globalEventBus),
        login: new LoginController(router, globalEventBus),
        profile: new ProfileController(router),
        seriesList: new ListController(router, globalEventBus, 'series'),
        filmsList: new ListController(router, globalEventBus, 'films'),
    };

    View.setBgImgInSessionStorage();

    router.add('/login', controllers.login.view);
    router.add('/movie', controllers.movie.view);
    router.add('/signup', controllers.signup.view);
    router.add('/profile', controllers.profile.view);
    router.add('/', controllers.seriesList.view);
    router.add('/series', controllers.seriesList.view);
    router.add('/films', controllers.filmsList.view);

    navbar.render(header);
    router.start();
});
