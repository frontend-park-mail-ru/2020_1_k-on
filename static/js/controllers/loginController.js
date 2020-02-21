import validation from '../components/validation';

const createLogin = () => {
    application.innerHTML = '';
    const menuItem = document.createElement('a');
    menuItem.textContent = 'Назад';
    menuItem.href = `/`;
    menuItem.dataset.section = 'menu';

    const authItem = document.createElement('div');
    authItem.className = 'auth-page';
    authItem.innerHTML = `
        <form class="auth-form" novalidate>
        <h1 class="auth-form__headline">ВХОД</h1>

        <label class="auth-form__label" for="login">Логин</label>
        <input class="auth-form__input auth-form__input_login" type="text" id="login" minlength="4" maxlength="15"
               autofocus required>
        <span class="border"></span>
        <div class="auth-form__error auth-form__error_login" id="login_error">Error</div>

        <label class="auth-form__label" for="password">Пароль</label>
        <input class="auth-form__input auth-form__input_password" type="password" id="password" minlength="4"
               maxlength="15" required>
        <span class="border"></span>
        <div class="auth-form__error auth-form__error_password" id="password_error">Error</div>

        <button class="auth-form__button auth-form__button_login" type="submit">Войти</button>
        </form>
    `;

    application.appendChild(menuItem);
    application.appendChild(authItem);

    validation();
};

export default createLogin;
