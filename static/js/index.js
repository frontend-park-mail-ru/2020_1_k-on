import LoginController from './controllers/loginController';
import SignUpController from './controllers/signUpController';
import MovieController from './controllers/movieController';
import ProfileController from './controllers/profileController';
import IndexController from './controllers/indexController';
import Navbar from './components/navbar/navbar';
import Router from './libs/router';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const container = document.getElementById('container');
    const navbar = new Navbar();
    const router = new Router(container);

    const controllers = {
        movie: new MovieController(),
        signup: new SignUpController(),
        login: new LoginController(),
        profile: new ProfileController(),
        index: new IndexController(),
    };

    router.add('/login', container, controllers.login.view);
    router.add('/movie', container, controllers.movie.view);
    router.add('/signup', container, controllers.signup.view);
    router.add('/profile', container, controllers.profile.view);
    router.add('/index', container, controllers.index.view);
    router.add('/', container, controllers.index.view);

    navbar.render(header);
    router.start();
});
