export default class Navbar {
    constructor() {
        this.navbarItems = {
            index: 'Главная',
            movie: 'Фильм',
            signup: 'Регистрация',
            login: 'Авторизация',
            profile: 'Профиль',
        };
        this.element = document.createElement('div');
    }

    render(root) {
        this.element.innerHTML = window.fest['js/components/navbar/navbar.tmpl'](this.navbarItems);
        root.appendChild(this.element);
    }
}
