import View from '../view';
import template from './authView.tmpl.xml';
import validation from '../../libs/validation';
import passwordToggler from '../../libs/passwordToggler';
import {SUCCESS_STATUS} from '../../libs/constants';

export default class AuthView extends View {
    constructor({
        eventBus = null,
        data = null,
        onSuccessEvents = [],
        apiMethod = null,
        inputsID = [],
    } = {}) {
        super(template, eventBus);
        this.validation = validation;
        this.passwordToggler = passwordToggler;
        this.data = data;
        this.onSuccesEvents = onSuccessEvents;
        this.apiMethod = apiMethod;
        this.inputsID = inputsID;
    }

    render(root) {
        this.setRandomBackgroundImg();
        super.render(root);
        this.afterRender();
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

        const inputsValue = [];
        this.inputsID.forEach((id) => {
            const value = document.getElementById(id).value;
            inputsValue.push(value);
        });

        this.apiMethod(...inputsValue)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.onSuccess();
                } else {
                    res.json().then((res) => this.onInvalid(res.error));
                }
            });
    }

    /**
     * Вызывает в шине событий события для успешной отправки формы
     */
    onSuccess() {
        this.onSuccesEvents.forEach((event) => {
            this.eventBus.publish(event);
        });
    }

    /**
     * Выполняет рендер ошибки формы
     * @param {string} resErrMsg
     */
    onInvalid(resErrMsg) {
        const formError = this.root.getElementsByClassName(
            'auth-page__form-error'
        )[0];

        formError.textContent = resErrMsg;
        formError.style.visibility = 'visible';
    }

    /**
     * Перед закрытием view вызывает close родителя и удаляет
     * обработчики событий
     */
    close() {
        super.close();
        this.root.removeEventListener('submit', this.onSubmit);
    }

    /**
     * Добавление обработчиков событий после рендера страницы
     */
    afterRender() {
        this.form = this.root.getElementsByClassName('auth-form')[0];
        this.form.addEventListener('submit', this.onSubmit.bind(this));

        this.toggle = this.root.getElementsByClassName('auth-form__eye')[0];
        this.toggle.addEventListener('click', this.passwordToggler);
    }
}
