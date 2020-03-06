import template from './navbar.tmpl.xml';
import Api from '../../libs/api';
import {SUCCESS_STATUS} from '../../libs/constants';

/**
 * Компонент navbar
 */
export default class Navbar {
    constructor(globalEventBus) {
        this.globalEventBus = globalEventBus;
        this.globalEventBus.subscribe(
            'renderForAuth',
            this.renderForAuth.bind(this)
        );
        this.globalEventBus.subscribe(
            'renderForUnauth',
            this.renderForUnauth.bind(this)
        );

        this.navbarAuthItems = {
            'profile': 'Профиль',
            'logout': 'Выйти',
        };

        this.navbarUnauthItems = {
            'login': 'Авторизация',
            'signup': 'Регистрация',
        };

        this.tmpl = template;
    }

    render(root) {
        this.root = root;
        this.root.innerHTML = this.tmpl();

        Api.getUserData()
            .then((res) => {
                res.status === SUCCESS_STATUS ?
                    this.renderForAuth() :
                    this.renderForUnauth();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    renderForAuth() {
        this.renderRightSide.bind(this);
        this.renderRightSide(this.navbarAuthItems);

        const logout = this.root.querySelector('[href="/logout"]');
        this.onLogout = this.onLogout.bind(this);
        logout.addEventListener('click', this.onLogout);
    }

    renderForUnauth() {
        this.renderRightSide(this.navbarUnauthItems);
    }

    renderRightSide(items) {
        const rightSide = this.root.getElementsByClassName(
            'navbar__right-side'
        )[0];
        rightSide.innerHTML = '';

        Object.keys(items).forEach((key) => {
            const link = document.createElement('a');
            link.href = `/${key}`;
            link.textContent = items[key];
            link.className = 'navbar__link';
            rightSide.appendChild(link);
        });
    }

    /**
     * Вызывается при клике на logout
     * @param {object} event
     */
    onLogout(event) {
        this.renderForUnauth();
        Api.doLogout()
            .catch((error) => {
                console.log(error);
            });
    }
}
