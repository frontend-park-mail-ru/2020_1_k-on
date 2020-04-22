import View from 'views/view';
import template from './profileSettingsView.tmpl.xml';
import Api from 'libs/api';
import FormComponent from 'components/formComponent/formComponent';
import {
    SUCCESS_STATUS,
    PROFILE_EVENTS,
    UNAUTHORIZED_STATUS,
    INTERNAL_ERROR_STATUS,
    DEFAULT_AVATAR,
    PROFILE_INPUTS,
} from 'libs/constants';

export default class ProfileSettingsView extends View {
    constructor(eventBus) {
        super(template, eventBus);
    }

    /**
     * Отправляет запрос на получение данных пользователя
     * в случае успеха - выполняет рендер,
     * в случае ошибки - направляет на страницу логина,
     * либо вызывается событие внутренней ошибки сервера
     * @param {HTMLElement} root
     */
    render(root) {
        this.root = root;

        Api.getUserData()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else if (res.status === UNAUTHORIZED_STATUS) {
                    this.eventBus.publish(PROFILE_EVENTS.unauthUser);
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.data = res.body;
                this.successRender();
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    /**
     * Добавляет обработчики событий и выполняет рендер
     */
    successRender() {
        this.data.avatar = this.data.image === '' ?
            DEFAULT_AVATAR :
            `http://64.225.100.179:8080/image/${this.data.image}`;

        super.render(this.root);

        const dataFormContainer = this.root.getElementsByClassName('data-form-container')[0];
        this.dataForm = new FormComponent({
            inputs: PROFILE_INPUTS.profile,
            buttonText: 'Сохранить',
            onSubmitCallback: this.onSubmit.bind(this),
        });
        dataFormContainer.appendChild(this.dataForm.render());

        const modalFormContainer = this.root.getElementsByClassName('modal-form-container')[0];
        this.modalForm = new FormComponent({
            inputs: PROFILE_INPUTS.modal,
            buttonText: 'Изменить пароль',
            onSubmitCallback: this.onModalSubmit.bind(this),
        });
        modalFormContainer.appendChild(this.modalForm.render());

        this.email = this.data.email;
        this.dataForm.setInputValue('email', this.email);

        this.username = this.data.username;
        this.dataForm.setInputValue('login', this.username);

        this.avatar = this.root.getElementsByClassName('user-avatar')[0];

        this.msgElement = this.root.getElementsByClassName('user-avatar__msg')[0];

        document.getElementById('avatar-input').addEventListener(
            'change',
            this.onUploadAvatar.bind(this)
        );

        this.modalWrapper = this.root.getElementsByClassName('modal-password-wrapper')[0];

        this.root.getElementsByClassName('user-settings__change-password')[0]
            .addEventListener(
                'click',
                this.openChangePasswordModal.bind(this)
            );

        this.root.getElementsByClassName('modal-password__close')[0].addEventListener(
            'click',
            this.closeChangePasswordModal.bind(this),
        );
    }

    /**
     * Отображает сообщение пользователю при изменении данных
     * @param {string} msg
     * @param {boolean} isError
     */
    showMessage(msg, isError = false) {
        this.msgElement.classList.replace(
            `user-avatar__msg_${isError ? 'success' : 'error'}`,
            `user-avatar__msg_${isError ? 'error' : 'success'}`,
        );
        this.msgElement.textContent = msg;
        this.msgElement.style.opacity = '1';
    }

    /**
     * Скрывает сообщение об изменении данных
     */
    hideMessage() {
        this.msgElement.style.opacity = '0';
    }

    /**
     * Вызывается при подтвреждении обновлении данных пользователя
     * @param {object} inputsValue
     */
    onSubmit(inputsValue) {
        Api.updateUser({
            login: inputsValue.login,
            email: inputsValue.email,
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.username = inputsValue.login;
                    this.email = inputsValue.email;
                    this.showMessage('Данные успешно изменены');
                } else if (res.status === INTERNAL_ERROR_STATUS) {
                    return Promise.reject(res);
                } else {
                    this.dataForm.setInputValue('login', this.username);
                    this.dataForm.setInputValue('email', this.email);
                    this.showMessage('Такой пользователь уже существует', true);
                }
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    /**
     * Вызывается при подтвреждении изменения пароля
     * @param {object} inputsValue
     */
    onModalSubmit(inputsValue) {
        if (inputsValue.password !== inputsValue['repeat-password']) {
            this.root.getElementsByClassName('modal-password')[0]
                .classList.add('modal-password_error');
            const formError = this.root.getElementsByClassName('modal-error')[0];
            formError.style.opacity = '1';
            formError.innerHTML = 'Пароли не совпадают';
            return;
        }

        Api.updateUser({
            password: inputsValue.password,
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.closeChangePasswordModal();
                    this.showMessage('Пароль успешно изменен');
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    /**
     * Обработчик на загрузку аватара пользователя
     * @param {object} event
     */
    onUploadAvatar(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            formData.append('file', file);
        }

        Api.uploadUserAvatar(formData)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else if (res.status === INTERNAL_ERROR_STATUS) {
                    return Promise.reject(res);
                } else {
                    this.showMessage('Ошибка при загрузке аватара', true);
                }
            })
            .then((res) => {
                this.avatar.style.backgroundImage =
                    `url(http://64.225.100.179:8080/image/${res.body})`;
                this.showMessage('Аватар загружен');
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    /**
     * Открытие модального окна для изменения пароля
     */
    openChangePasswordModal() {
        this.modalWrapper.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
    }

    /**
     * Закрытие модального окна для изменения пароля
     */
    closeChangePasswordModal() {
        this.modalForm.clearForm();
        this.root.getElementsByClassName('modal-password')[0]
            .classList.remove('modal-password_error');
        this.root.getElementsByClassName('modal-error')[0].style.opacity = '0';
        this.modalWrapper.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }
}
