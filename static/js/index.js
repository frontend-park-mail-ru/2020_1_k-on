import NavbarController from './controllers/navbarController';
import LoginController from './controllers/loginController';
import SignUpController from './controllers/signUpController';
import MovieController from './controllers/movieController';

document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');

    const movieCtrl = new MovieController();
    const signUpCtrl = new SignUpController();
    const loginCtrl = new LoginController();
    const navbarCtrl = new NavbarController();

    const routes = {
        login: loginCtrl,
        signup: signUpCtrl,
        movie: movieCtrl,
    };

    header.addEventListener('click', (evt) => {
        const {target} = evt;

        if (target instanceof HTMLAnchorElement) {
            evt.preventDefault();
            routes[target.dataset.section].render();
        }
    });

    navbarCtrl.render();
});
