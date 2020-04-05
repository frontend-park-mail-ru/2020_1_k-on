import 'css/style.scss';

import LoginController from 'controllers/loginController';
import SignUpController from 'controllers/signUpController';
import MovieController from 'controllers/movieController';
import ProfileController from 'controllers/profileController';
import ListController from 'controllers/listController';
import IndexController from 'controllers/indexController';
import Navbar from 'components/navbar/navbar';
import Router from 'libs/router';
import EventBus from 'libs/eventBus';
import View from 'views/view';
import PersonController from "controllers/personController";

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const container = document.getElementById('container');
    const globalEventBus = new EventBus();
    const navbar = new Navbar(globalEventBus);
    const router = new Router(container);

    const controllers = {
        login: new LoginController(router, globalEventBus),
        signup: new SignUpController(router, globalEventBus),
        profile: new ProfileController(router),
        index: new IndexController(router),
        seriesList: new ListController(router, globalEventBus, 'series'),
        filmsList: new ListController(router, globalEventBus, 'films'),
        series: new MovieController(router, globalEventBus, 'series'),
        movie: new MovieController(router, globalEventBus, 'films'),
        person: new PersonController(router, globalEventBus),
    };

    View.setBgImgInSessionStorage();

    router.add('/login', controllers.login.view);
    router.add('/signup', controllers.signup.view);
    router.add('/profile', controllers.profile.view);
    router.add('/', controllers.index.view);
    router.add('/series', controllers.seriesList.view);
    router.add('/films', controllers.filmsList.view);
    router.add('/series/1', controllers.series.view);
    router.add('/films/1', controllers.movie.view);
    router.add('/persons/1', controllers.person.view);

    navbar.render(header);
    router.start();
});
