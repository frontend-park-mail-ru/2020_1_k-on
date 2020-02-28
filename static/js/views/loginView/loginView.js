import View from '../view';
import template from './loginView.tmpl.xml';
import validation from '../../libs/validation';

const SUCCESS_LOGIN = 200;

export default class LoginView extends View {
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
            const password = document.getElementById('password').value;

            fetch('http://64.225.100.179:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    'username': login,
                    'password': password,
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
                    if (res.status === SUCCESS_LOGIN) {
                        this.onSuccessLogin();
                    } else {
                        this.onInvalidLogin(res.body.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    onSuccessLogin() {
        this.router.change('/');
    }

    onInvalidLogin(resErrMsg) {
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
