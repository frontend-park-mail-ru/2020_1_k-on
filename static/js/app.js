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
import PersonController from 'controllers/personController';
import {GLOBAL_EVENTS} from 'libs/constants';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const container = document.getElementById('container');
    const globalEventBus = new EventBus();
    const navbar = new Navbar(globalEventBus);
    const router = new Router(container);

    globalEventBus.subscribe(
        GLOBAL_EVENTS.internalError,
        (code) => router.internalError(code),
    );

    const controllers = {
        login: new LoginController(router, globalEventBus),
        profile: new ProfileController(router, globalEventBus),
        signup: new SignUpController(router, globalEventBus),
        index: new IndexController(globalEventBus),
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
    router.add('/profile/settings', controllers.profile.settingsView);
    router.add('/', controllers.index.view);
    router.add('/series', controllers.seriesList.view);
    router.add('/films', controllers.filmsList.view);
    router.add('/series/<int>', controllers.series.view);
    router.add('/films/<int>', controllers.movie.view);
    router.add('/persons/<int>', controllers.person.view);
    router.add('/series/<string>', controllers.seriesList.view);
    router.add('/films/<string>', controllers.filmsList.view);

    navbar.render(header);
    router.start();
});
