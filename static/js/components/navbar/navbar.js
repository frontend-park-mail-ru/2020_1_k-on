import template from './navbar.tmpl.xml';

/**
 * Компонент navbar
 */
export default class Navbar {
    constructor() {
        this.navbarItems = {
            '/': 'Главная',
            'movie': 'Фильм',
            'signup': 'Регистрация',
            'login': 'Авторизация',
            'profile': 'Профиль',
            'logout': 'Выйти',
        };
        this.tmpl = template;
    }

    render(root) {
        root.innerHTML = this.tmpl(this.navbarItems);

        const logout = root.querySelector('[href="logout"]');
        this.onLogout = this.onLogout.bind(this);
        logout.addEventListener('click', this.onLogout);
    }

    /**
     * Вызывается при клике на logout
     * @param {object} event
     */
    onLogout(event) {
        fetch('http://64.225.100.179:8080/logout', {
            method: 'DELETE',
            credentials: 'include',
        })
            .catch((error) => {
                console.log('error happened');
            });
    }
}
