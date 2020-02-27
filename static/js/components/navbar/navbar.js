export default class Navbar {
    constructor() {
        this.navbarItems = {
            index: 'Главная',
            movie: 'Фильм',
            signup: 'Регистрация',
            login: 'Авторизация',
            profile: 'Профиль',
            logout: 'Выйти',
        };
        this.element = document.createElement('div');
    }

    render(root) {
        this.element.innerHTML = window.fest[
            'js/components/navbar/navbar.tmpl'
        ](this.navbarItems);
        root.appendChild(this.element);

        const logout = root.querySelector('[href="/logout"');
        this.onLogout = this.onLogout.bind(this);
        logout.addEventListener('click', this.onLogout);
    }

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
