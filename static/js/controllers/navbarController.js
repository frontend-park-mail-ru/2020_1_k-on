export default class NavbarController {
    navbarItems = {
        signup: 'Регистрация',
        login: 'Авторизация',
        movie: 'Фильм',
    };

    render() {
        const header = document.getElementById('header');
        header.innerHTML = '';
        Object.keys(this.navbarItems).forEach((key) => {
            const navbarItem = document.createElement('a');
            navbarItem.textContent = this.navbarItems[key];
            navbarItem.href = `/${key}`;
            navbarItem.dataset.section = key;

            header.appendChild(navbarItem);
        });
    }
}
