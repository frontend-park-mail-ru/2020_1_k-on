import View from './view';
import validation from '../libs/validation';

const SUCCESS_SIGN_UP = 200;
const INVALID_SIGN_UP = 401;

const template = `
    <form class="auth-form" novalidate>
    <h1 class="auth-form__headline">РЕГИСТРАЦИЯ</h1>
    
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

    <button class="auth-form__button auth-form__button_signup"
        type="submit">Зарегистрироваться</button>
    </form>
`;

export default class SignUpView extends View {
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
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordRepeat = document.getElementById(
                'password_repeat'
            ).value;

            if (password !== passwordRepeat) {
                this.onInvalidSignUp('Пароли не совпадают');
                return;
            }


            fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': login,
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
                    if (res.status === SUCCESS_SIGN_UP) {
                        this.onSuccessSignUp();
                    } else if (res.status === INVALID_SIGN_UP) {
                        this.onInvalidSignUp(res.body.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    onSuccessSignUp() {
        location.pathname = '/';
    }

    onInvalidSignUp(resErrMsg) {
        const formError = this.element.getElementsByClassName(
            'auth-form__error'
        )[0];

        formError.textContent = resErrMsg;
        formError.style.visibility = 'visible';
    }

    close() {
        this.root.removeEventListener('submit', this.onSubmit);
        super.close();
    }
}
