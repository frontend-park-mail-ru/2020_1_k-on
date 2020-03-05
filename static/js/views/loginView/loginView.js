import View from '../view';
import template from './loginView.tmpl.xml';
import validation from '../../libs/validation';
import Api from '../../libs/api';
import {SUCCESS_STATUS} from '../../libs/constants';
import passwordToggler from '../../libs/passwordToggler';

export default class LoginView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.validation = validation;
        this.passwordToggler = passwordToggler;
    }

    render(root) {
        super.render(root, null);

        this.onSubmit = this.onSubmit.bind(this);
        this.root.addEventListener('submit', this.onSubmit);

        this.toggle = this.root.getElementsByClassName(
            'form__eye'
        )[0];
        this.toggle.onclick = this.passwordToggler;
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
        this.eventBus.publish('loginSuccess');
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
     * Перед закрытием view удаляет обработчики событий
     * и очищает контент
     */
    close() {
        this.root.removeEventListener('submit', this.onSubmit);
        super.close();
    }
}
