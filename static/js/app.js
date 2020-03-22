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
        list: new ListController(router),
        index: new IndexController(router),
    };

    View.setBgImgInSessionStorage();

    router.add('/login', controllers.login.view);
    router.add('/movie', controllers.movie.view);
    router.add('/signup', controllers.signup.view);
    router.add('/profile', controllers.profile.view);
    router.add('/list', controllers.list.view);
    router.add('/', controllers.index.view);

    navbar.render(header);
    router.start();
});
