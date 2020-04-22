import View from 'views/view';
import template from './authView.tmpl.xml';
import FormComponent from 'components/formComponent/formComponent';
import {
    BAD_REQUEST_STATUS,
    FORBIDDEN_STATUS,
    INTERNAL_ERROR_STATUS,
    NOT_FOUND_STATUS,
    PROFILE_EVENTS,
    SUCCESS_STATUS,
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
                } else if (res.status === INTERNAL_ERROR_STATUS) {
                    return Promise.reject(res);
                } else {
                    this.root.getElementsByClassName('auth-content')[0]
                        .classList.add('auth-content_error');

                    if (res.status === BAD_REQUEST_STATUS || res.status === NOT_FOUND_STATUS) {
                        this.onInvalid(this.data.messages.bad_request);
                    } else if (res.status === FORBIDDEN_STATUS) {
                        this.onInvalid(this.data.messages.forbidden);
                    }
                }
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
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
        });
        formContainer.appendChild(this.formComponent.render());
    }
}
