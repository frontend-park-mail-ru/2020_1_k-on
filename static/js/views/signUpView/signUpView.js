import View from '../view';
import template from './signUpView.tmpl.xml';
import validation from '../../libs/validation';

const SUCCESS_SIGN_UP = 200;

export default class SignUpView extends View {
    constructor(router) {
        super(template, router);
        this.validation = validation;
    }

    render(root) {
        super.render(root, null);

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


            fetch('http://64.225.100.179:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    'Username': login,
                    'Password': password,
                    'Email': email,
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
                    } else {
                        this.onInvalidSignUp(res.body.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    onSuccessSignUp() {
        this.router.change('/');
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
