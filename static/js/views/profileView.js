import View from './view';
import validation from '../libs/validation';

const USER_AUTH = 200;
const SUCCESS_CHANGE = 200;
const FAIL_CHANGE = 403;

const template = `
    <form class="auth-form" novalidate>
    <h1 class="auth-form__headline">ПРОФИЛЬ</h1>

    <div class="auth-form__error" id="form_error">Error</div>

    <label class="auth-form__label" for="login">Логин</label>
    <input class="auth-form__input auth-form__input_login"
        type="text" id="login" minlength="4" maxlength="15"
        autofocus required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_login"
        id="login_error">Error</div>
        
    <label class="auth-form__label" for="email">Почта</label>
    <input class="auth-form__input auth-form__input_email"
        type="email" id="email" required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_email"
        id="email_error">Error</div>    

    <label class="auth-form__label" for="password">Пароль</label>
    <input class="auth-form__input auth-form__input_password"
        type="password" id="password" minlength="4"
        maxlength="15" required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_password"
        id="password_error">Error</div>
        
    <label class="auth-form__label" for="password">Повтор пароля</label>
    <input class="auth-form__input auth-form__input_password_repeat"
        type="password" id="password_repeat" minlength="4"
        maxlength="15" required>
    <span class="border"></span>
    <div class="auth-form__error auth-form__error_password_repeat"
        id="password_repeat_error">Error</div>

    <button class="auth-form__button auth-form__button_login"
        type="submit">Сохранить</button>
    </form>
`;

export default class ProfileView extends View {
    constructor() {
        super(template);
        this.validation = validation;
    }

    render(root) {
        this.root = root;

        this.getUserData()
            .then((res) => {
                if (res.status === USER_AUTH) {
                    this.email = res.body.email;
                    this.login = res.body.login;
                    this.onSuccess();
                } else {
                    location.pathname = '/login';
                }
            });
    }

    getUserData() {
        return fetch('http://localhost:3000/user', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json().then(
                (data) => (
                    {
                        status: res.status,
                        body: data,
                    }
                )
            )
            )
            .catch((error) => {
                console.log(error);
            });
    }

    onSuccess() {
        this.element.className = 'auth-page';
        super.render(this.root);

        document.getElementById('login').value = this.login;
        document.getElementById('email').value = this.email;

        this.onSubmit = this.onSubmit.bind(this);
        this.root.addEventListener('submit', this.onSubmit);
    }

    onInvalidForm(resErrMsg) {
        const formError = this.element.getElementsByClassName(
            'auth-form__error'
        )[0];

        formError.textContent = resErrMsg;
        formError.style.visibility = 'visible';
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.validation()) {
            const login = document.getElementById('login').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordRepeat = document.getElementById(
                'password_repeat'
            ).value;

            if (password !== passwordRepeat) {
                this.onInvalidForm('Пароли не совпадают');
                return;
            }

            fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email,
                },
                ),
            })
                .then((res) => res.json().then(
                    (data) => (
                        {
                            status: res.status,
                            body: data,
                        }
                    )
                )
                )
                .then((res) => {
                    if (res.status === SUCCESS_CHANGE) {
                        this.email = res.body.email;
                        this.login = res.body.login;
                        this.close();
                        this.onSuccess();
                    } else if (res.status === FAIL_CHANGE) {
                        this.onInvalidForm(res.body.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    close() {
        this.root.removeEventListener('submit', this.onSubmit);
        super.close();
    }
}
