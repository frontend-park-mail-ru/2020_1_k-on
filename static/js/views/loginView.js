import View from './view';
import validation from '../libs/validation';

const SUCCESS_LOGIN = 200;
const INVALID_LOGIN = 401;

const template = `
    <form class="auth-form" novalidate>
    <h1 class="auth-form__headline">ВХОД</h1>

    <div class="auth-form__error" id="form_error">Error</div>

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
    FORM_ERROR_MSG = 'Неправильный логин или пароль!';

    constructor() {
        super(template);
        this.validation = validation;
    }

    render(root) {
        this.element.className = 'auth-page';
        super.render(root);

        this.onSubmit = this.onSubmit.bind(this);
        this.root.addEventListener('submit', this.onSubmit);
    }

    onSubmit(event) {
        event.preventDefault();
        const validationResult = this.validation();

        if (validationResult) {
            const login = document.getElementById('login').value;
            const password = document.getElementById('password').value;

            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': login,
                    'password': password,
                },
                ),
            })
                .then((res) => {
                    if (res.status === SUCCESS_LOGIN) {
                        this.onSuccessLogin();
                    } else if (res.status === INVALID_LOGIN) {
                        this.onInvalidLogin(res);
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    onSuccessLogin() {
        location.pathname = '/';
    }

    onInvalidLogin() {
        const formError = this.element.getElementsByClassName(
            'auth-form__error'
        )[0];

        formError.textContent = this.FORM_ERROR_MSG;
        formError.style.visibility = 'visible';
    }

    close() {
        this.root.removeEventListener('submit', this.onSubmit);
        super.close();
    }
}
