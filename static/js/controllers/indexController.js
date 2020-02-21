const menuItems = {
    signup: 'Регистрация',
    login: 'Авторизация',
    movie: 'Фильм',
};

const createIndex = () => {
    application.innerHTML = '';
    Object.keys(menuItems).forEach((key) => {
        const menuItem = document.createElement('a');
        menuItem.textContent = menuItems[key];
        menuItem.href = `/${key}`;
        menuItem.dataset.section = key;

        application.appendChild(menuItem);
    });
};

export default createIndex;
