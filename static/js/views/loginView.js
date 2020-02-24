import View from './view';
import validation from '../components/validation';

const template = `
    <form class="auth-form" novalidate>
    <h1 class="auth-form__headline">ВХОД</h1>

    <label class="auth-form__label" for="login">Логин</label>
    <input class="auth-form__input auth-form__input_login"
        type="text" id="login" minlength="4" maxlength="15"
        autofocus required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_login"
        id="login_error">Error</div>

    <label class="auth-form__label" for="password">Пароль</label>
    <input class="auth-form__input auth-form__input_password"
        type="password" id="password" minlength="4"
        maxlength="15" required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_password"
        id="password_error">Error</div>

    <button class="auth-form__button auth-form__button_login"
        type="submit">Войти</button>
    </form>
`;

export default class LoginView extends View {
    constructor() {
        super(template);
        this.validation = validation;
    }

    render(root) {
        this.element.className = 'auth-page';
        super.render(root);
        this.validation();
    }
}
