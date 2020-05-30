import Component from 'components/component';
import template from './profileSettingsComponent.tmpl.xml';
import EventBus from 'libs/eventBus';
import Api from 'libs/api';
import FormComponent from 'components/formComponent/formComponent';
import {
    CONFLICT_STATUS,
    PROFILE_EVENTS,
    PROFILE_MSGS,
    PROFILE_SETTINGS_INPUTS,
    SUCCESS_STATUS,
} from 'libs/constants';

export default class ProfileSettingsComponent extends Component {
    constructor({
        email = '',
        login = '',
        eventBus = new EventBus(),
    }) {
        super(template, eventBus);

        this.login = login;
        this.email = email;

        this.element = document.createElement('div');
        this.element.classList.add('user-settings-wrapper');
    }

    afterRender() {
        this.settingsForm = new FormComponent({
            inputs: PROFILE_SETTINGS_INPUTS.settings,
            buttonText: 'Сохранить',
            onSubmitCallback: this.onSettingsSubmit.bind(this),
        });
        this.element.getElementsByClassName('settings-form-container')[0]
            .appendChild(this.settingsForm.render());
        this.settingsForm.setInputValue('email', this.email);
        this.settingsForm.setInputValue('login', this.login);

        this.passwordForm = new FormComponent({
            inputs: PROFILE_SETTINGS_INPUTS.password_modal,
            buttonText: 'Изменить пароль',
            onSubmitCallback: this.onPasswordSubmit.bind(this),
        });
        this.element.getElementsByClassName('modal-password-form-container')[0]
            .appendChild(this.passwordForm.render());

        this.element.getElementsByClassName('user-settings__change-password')[0]
            .addEventListener('click', this.openModal.bind(this));
        this.modalWrapper = this.element.getElementsByClassName('modal-wrapper')[0];
        this.element.getElementsByClassName('modal-form__close')[0]
            .addEventListener('click', this.closeModal.bind(this));
    }

    openModal() {
        this.modalWrapper.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.passwordForm.clearForm();
        this.element.getElementsByClassName('modal-password')[0]
            .classList.remove('modal-form_error');
        this.element.getElementsByClassName('modal-error')[0].style.opacity = '0';
        this.modalWrapper.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }

    onSettingsSubmit(inputsValue) {
        Api.updateUser({
            login: inputsValue.login,
            email: inputsValue.email,
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.login = inputsValue.login;
                    this.email = inputsValue.email;
                    this.eventBus.publish(PROFILE_EVENTS.showMsg, PROFILE_MSGS.settings_update);
                    this.eventBus.publish(
                        PROFILE_EVENTS.updateUserData,
                        inputsValue.login,
                        inputsValue.email
                    );
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                this.settingsForm.setInputValue('login', this.login);
                this.settingsForm.setInputValue('email', this.email);
                const msg = err.status === CONFLICT_STATUS ?
                    PROFILE_MSGS.user_exists : PROFILE_MSGS.error_change_user_data;
                this.eventBus.publish(PROFILE_EVENTS.showMsg, msg, true);
            });
    }

    onPasswordSubmit(inputsValue) {
        if (inputsValue.password !== inputsValue['repeat-password']) {
            this.renderModalError(PROFILE_MSGS.passwords_not_match);
            return;
        }

        Api.updateUser({
            password: inputsValue.password,
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.closeModal();
                    this.eventBus.publish(PROFILE_EVENTS.showMsg, PROFILE_MSGS.updatePassword);
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO CHANGE PASSWORD`);
                this.renderModalError(PROFILE_EVENTS.showMsg);
            });
    }

    renderModalError(msg = '') {
        this.element.getElementsByClassName('modal-password')[0]
            .classList.add('modal-form_error');
        const modalError = this.element.getElementsByClassName('modal-error')[0];
        modalError.style.opacity = '1';
        modalError.innerHTML = msg;
    }
}
