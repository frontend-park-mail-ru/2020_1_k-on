import LoginController from './controllers/loginController';
import SignUpController from './controllers/signUpController';
import MovieController from './controllers/movieController';
import ProfileController from './controllers/profileController';
import IndexController from './controllers/indexController';
import Navbar from './components/navbar/navbar';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const container = document.getElementById('container');

    const controllers = {
        movie: new MovieController(),
        signup: new SignUpController(),
        login: new LoginController(),
        profile: new ProfileController(),
        index: new IndexController(),
    };

    const navbar = new Navbar();

    header.addEventListener('click', (evt) => {
        const {target} = evt;

        if (target instanceof HTMLAnchorElement) {
            evt.preventDefault();
            controllers[target.dataset.section].view.render(container);
        }
    });

    navbar.render(header);
    controllers.index.view.render(container);
});
