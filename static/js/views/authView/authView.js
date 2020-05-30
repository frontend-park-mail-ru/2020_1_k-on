import View from 'views/view';
import template from './authView.tmpl.xml';
import FormComponent from 'components/formComponent/formComponent';
import {
    BAD_REQUEST_STATUS,
    FORBIDDEN_STATUS,
    NOT_FOUND_STATUS,
    SUCCESS_STATUS,
    SERVER_UNAVAILABLE_MSG,
} from 'libs/constants';

export default class AuthView extends View {
    constructor({
        eventBus = null,
        data = null,
        onSuccessEvents = [],
        apiMethod = null,
    } = {}) {
        super(template, eventBus);

        this.data = data;
        this.onSuccesEvents = onSuccessEvents;
        this.apiMethod = apiMethod;
    }

    render(root) {
        this.setRandomBackgroundImg();
        super.render(root);
        this.afterRender();
    }

    /**
     * Отправляет форму
     * @param {object} inputsValue
     */
    onSubmit(inputsValue) {
        this.apiMethod(inputsValue)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.onSuccess();
                } else {
                    return Promise.reject(res.status);
                }
            })
            .catch((status) => {
                switch (status) {
                case BAD_REQUEST_STATUS:
                case NOT_FOUND_STATUS:
                    this.onInvalid(this.data.messages.bad_request);
                    break;
                case FORBIDDEN_STATUS:
                    this.onInvalid(this.data.messages.forbidden);
                    break;
                default:
                    this.onInvalid(SERVER_UNAVAILABLE_MSG);
                }
            });
    }

    onVkAuth() {
        window.location = 'https://oauth.vk.com/authorize?access_type=offline' +
            '&client_id=7487797&redirect_uri=https://kino-on.ru/api/oauth' +
            '&response_type=code&scope=email&state=state';
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
        this.root.getElementsByClassName('auth-content')[0]
            .classList.add('auth-content_error');

        const formError = this.root.getElementsByClassName('auth-page__form-error')[0];
        formError.textContent = resErrMsg;
        formError.style.opacity = '1';
    }

    afterRender() {
        const formContainer = this.root.getElementsByClassName('form-container')[0];
        this.formComponent = new FormComponent({
            inputs: this.data.inputs,
            buttonText: this.data.button_text,
            onSubmitCallback: this.onSubmit.bind(this),
            onVkAuthCallback: this.onVkAuth.bind(this),
            isVkAuth: true,
        });
        formContainer.appendChild(this.formComponent.render());
    }
}
