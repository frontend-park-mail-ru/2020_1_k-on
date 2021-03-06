import template from './navbarComponent.tmpl.xml';
import Component from 'components/component';
import Api from 'libs/api';
import {
    SUCCESS_STATUS,
    NAVBAR_UNAUTH_ITEMS,
    GLOBAL_EVENTS,
    DEFAULT_AVATAR,
    HOST_ADDRESS,
} from 'libs/constants';

/**
 * Компонент navbar
 */
export default class NavbarComponent extends Component {
    constructor(globalEventBus) {
        super(template, globalEventBus);

        this.eventBus.subscribe(
            GLOBAL_EVENTS.renderForAuth,
            this.renderForAuth.bind(this)
        );

        this.eventBus.subscribe(
            GLOBAL_EVENTS.renderForUnauth,
            this.renderForUnauth.bind(this)
        );

        this.eventBus.subscribe(GLOBAL_EVENTS.linkClick, this.closeMenu.bind(this));

        this.navbarUnauthItems = NAVBAR_UNAUTH_ITEMS;

        this.element = document.createElement('div');
        this.element.classList.add('navbar', 'page-layout');
    }

    afterRender() {
        Api.getUserData()
            .then((res) => {
                res.status === SUCCESS_STATUS ?
                    this.eventBus.publish(GLOBAL_EVENTS.renderForAuth) :
                    this.eventBus.publish(GLOBAL_EVENTS.renderForUnauth);
            });

        const menuLink = this.element.getElementsByClassName('navbar__menu-link')[0];
        menuLink.addEventListener('click', this.onMenuClick.bind(this));
    }

    renderForAuth() {
        window.sessionStorage.setItem('isUserAuth', true);
        const unauth = this.element.getElementsByClassName('navbar-menu__unauthorized')[0];
        unauth.classList.remove('navbar-menu__unauthorized_visible');

        Api.getUserData()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.renderRightSide.bind(this);

                this.renderRightSide({
                    profile: {
                        username: res.body.username,
                        image: res.body.image,
                    },
                    logout: '',
                });
                const logout = this.element.querySelector('[href="/logout"]');
                this.onLogout = this.onLogout.bind(this);

                logout.addEventListener('click', this.onLogout);
            })
            .catch((err) => {
                console.log(`${err.status}: FAILED TO FETCH USER DATA`);
                window.sessionStorage.setItem('isUserAuth', false);
                this.eventBus.publish(GLOBAL_EVENTS.renderForUnauth);
            });
    }

    renderForUnauth() {
        window.sessionStorage.setItem('isUserAuth', false);
        const unauth = this.element.getElementsByClassName('navbar-menu__unauthorized')[0];

        unauth.classList.add('navbar-menu__unauthorized_visible');
        this.renderRightSide(this.navbarUnauthItems);
    }

    renderRightSide(items) {
        const rightSide = this.element.getElementsByClassName('navbar__right-side')[0];
        rightSide.innerHTML = '';

        Object.keys(items).forEach((key) => {
            const link = document.createElement('a');
            link.href = `/${key}`;
            link.className = 'navbar__link';

            switch (key) {
            case 'signup':
                link.classList.add('navbar-menu__link_bright');
            case 'login':
                link.textContent = items[key];
                link.classList.add('navbar__link_unauthorized', 'navbar-menu__link_circled');

                break;
            case 'profile':
                // link.style.display = 'flex';
                // link.style.alignItems = 'center';

                const username = document.createElement('span');
                username.classList.add('navbar__link_username');
                username.textContent = items[key].username;

                const avatar = document.createElement('div');
                avatar.className = 'navbar__link_avatar';
                avatar.style.backgroundImage = items[key].image ?
                    `url(${HOST_ADDRESS}/static/img/${items[key].image})` :
                    `url(${DEFAULT_AVATAR})`;

                link.appendChild(username);
                link.appendChild(avatar);

                break;
            case 'logout':
                const logoutImage = document.createElement('div');
                logoutImage.className = 'navbar__link_logout';
                link.appendChild(logoutImage);

                break;
            default:
                link.textContent = items[key];
            }

            rightSide.appendChild(link);
        });
    }

    /**
     * Вызывается при клике на logout
     * @param {object} event
     */
    onLogout(event) {
        Api.doLogout()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.eventBus.publish(GLOBAL_EVENTS.renderForUnauth);
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                console.log(`${err.status}: FAILED TO LOGOUT`);
            });
    }

    onMenuClick(evt) {
        const navbar = evt.currentTarget.parentNode.parentNode;
        const menu = navbar.lastElementChild;

        if (menu.classList.contains('navbar-menu_active')) {
            navbar.classList.remove('navbar_menu-active');
            menu.classList.remove('navbar-menu_active');
        } else {
            navbar.classList.add('navbar_menu-active');
            menu.classList.add('navbar-menu_active');
        }
    }

    closeMenu(evt) {
        const navbar = this.element;
        const menu = navbar.lastElementChild;

        navbar.classList.remove('navbar_menu-active');
        menu.classList.remove('navbar-menu_active');
    }
}
