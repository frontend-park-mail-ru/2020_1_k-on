import View from '../view';
import template from './signUpView.tmpl.xml';
import validation from '../../libs/validation';
import Api from '../../libs/api';
import {SUCCESS_STATUS} from '../../libs/constants';

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

        if (!validationResult) {
            return;
        }

        const password = document.getElementById('password').value;
        const passwordRepeat = document.getElementById(
            'password_repeat'
        ).value;

        if (password !== passwordRepeat) {
            this.onInvalidSignUp('Пароли не совпадают');
            return;
        }

        const login = document.getElementById('login').value;
        const email = document.getElementById('email').value;

        Api.doSignUp(login, email, password)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.onSuccessSignUp();
                } else {
                    res.json().then((res) => this.onInvalidSignUp(res.error));
                }
            });
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
