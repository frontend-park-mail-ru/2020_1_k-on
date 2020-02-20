import ajax from './modules/ajax';

const application = document.getElementById('application');

const menuItems = {
    signup: 'Регистрация',
    login: 'Авторизация',
    movie: 'Фильм',
};

const createMenu = () => {
    application.innerHTML = '';
    Object.keys(menuItems).forEach((key) => {
        const menuItem = document.createElement('a');
        menuItem.textContent = menuItems[key];
        menuItem.href = `/${key}`;
        menuItem.dataset.section = key;

        application.appendChild(menuItem);
    });

    ajax();
};

const routes = {
    menu: createMenu,
    signup: null,
    login: null,
    movie: null,
};

application.addEventListener('click', (evt) => {
    const {target} = evt;

    if (target instanceof HTMLAnchorElement) {
        evt.preventDefault();
        routes[target.dataset.section]();
    }
});

createMenu();
