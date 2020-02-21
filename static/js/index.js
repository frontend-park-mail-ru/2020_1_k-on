import createLogin from './controllers/loginController';
import createIndex from './controllers/indexController';
import createSignUp from './controllers/signupController';
import createMovie from './controllers/movieController';

const application = document.getElementById('application');

const routes = {
    menu: createIndex,
    login: createLogin,
    signup: createSignUp,
    movie: createMovie,
};

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        routes[target.dataset.section]();
    }
});

createIndex();
