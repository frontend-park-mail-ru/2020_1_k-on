import View from '../view';
import template from './loginView.tmpl.xml';
import validation from '../../libs/validation';
import Api from '../../libs/api';
import {SUCCESS_STATUS} from '../../libs/constants';
import {LOGIN_EVENTS} from '../../libs/constants';
import {MAX_BG_IMGS} from '../../libs/constants';
import passwordToggler from '../../libs/passwordToggler';

export default class LoginView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.validation = validation;
        this.passwordToggler = passwordToggler;
    }

    render(root) {
        const randomNumber = Math.floor(Math.random() * MAX_BG_IMGS) + 1;
        const bgImgUrl = `/static/img/background_${randomNumber}.jpg`;
        super.render(root, {
            bg_img_url: bgImgUrl,
        });

        this.form = this.root.getElementsByClassName('form')[0];
        this.form.addEventListener('submit', this.onSubmit.bind(this));

        this.toggle = this.root.getElementsByClassName('form__eye')[0];
        this.toggle.addEventListener('click', this.passwordToggler);
    }

    /**
     * Валидирует и отправляет форму
     * @param {object} event
     */
    onSubmit(event) {
        event.preventDefault();
        const validationResult = this.validation();

        if (!validationResult) {
            return;
        }

        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;

        Api.doLogin(login, password)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.onSuccessLogin();
                } else {
                    this.onInvalidLogin('Пользователь не найден!');
                }
            });
    }

    onSuccessLogin() {
        this.eventBus.publish(LOGIN_EVENTS.loginSuccess);
        this.eventBus.publish(LOGIN_EVENTS.renderForAuth);
    }

    /**
     * Выполняет рендер ошибки формы
     * @param {string} resErrMsg
     */
    onInvalidLogin(resErrMsg) {
        const formError = this.root.getElementsByClassName(
            'form-error'
        )[0];

        formError.textContent = resErrMsg;
        formError.style.visibility = 'visible';
    }

    /**
     * Перед закрытием view очищает контент
     */
    close() {
        super.close();
    }
}
