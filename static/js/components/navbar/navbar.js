export default class Navbar {
    constructor() {
        this.navbarItems = {
            signup: 'Регистрация',
            login: 'Авторизация',
            movie: 'Фильм',
        };
    }

    render(root) {
        root.innerHTML = '';
        Object.keys(this.navbarItems).forEach((key) => {
            const navbarItem = document.createElement('a');
            navbarItem.textContent = this.navbarItems[key];
            navbarItem.href = `/${key}`;
            navbarItem.dataset.section = key;

            root.appendChild(navbarItem);
        });
    }
}
