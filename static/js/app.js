import 'css/style.scss';

import LoginController from 'controllers/loginController';
import SignUpController from 'controllers/signUpController';
import MovieController from 'controllers/movieController';
import ProfileController from 'controllers/profileController';
import ListController from 'controllers/listController';
import IndexController from 'controllers/indexController';
import PersonController from 'controllers/personController';
import NavbarComponent from 'components/navbarComponent/navbarComponent';
import Router from 'libs/router';
import EventBus from 'libs/eventBus';
import View from 'views/view';
import initScale from 'libs/scale';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import {
    GLOBAL_EVENTS,
    INTERNAL_ERROR_MSG,
    INTERNAL_ERROR_STATUS,
    NOT_FOUND_ERROR_MSG,
} from 'libs/constants';
import SearchController from 'controllers/searchController';

document.addEventListener('DOMContentLoaded', () => {
    initScale();

    if ('serviceWorker' in navigator) {
        runtime.register();
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .catch((err) => (console.log('SW registration FAIL:', err)));
    }

    const header = document.getElementById('header');
    const container = document.getElementById('container');
    const globalEventBus = new EventBus();
    const navbar = new NavbarComponent(globalEventBus);
    const router = new Router(container, globalEventBus);

    globalEventBus.subscribe(GLOBAL_EVENTS.internalError, (code) => {
        router.renderError(code, code === INTERNAL_ERROR_STATUS ?
            INTERNAL_ERROR_MSG :
            NOT_FOUND_ERROR_MSG
        );
    });

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
        search: new SearchController(router, globalEventBus),
    };

    View.setBgImgInSessionStorage();

    router.add('/login', controllers.login.view);
    router.add('/signup', controllers.signup.view);
    router.add('/profile', controllers.profile.view);
    router.add('/', controllers.index.view);
    router.add('/series', controllers.seriesList.view);
    router.add('/films', controllers.filmsList.view);
    router.add('/series/<int>', controllers.series.view);
    router.add('/films/<int>', controllers.movie.view);
    router.add('/persons/<int>', controllers.person.view);
    router.add('/series/<string>', controllers.seriesList.view);
    router.add('/films/<string>', controllers.filmsList.view);
    router.add('/search', controllers.search.view);

    header.appendChild(navbar.render());
    router.start();
});
