import View from 'views/view';
import validation from 'libs/validation';
import template from './profileSettingsView.tmpl.xml';
import Api from 'libs/api';
import passwordToggler from 'libs/passwordToggler';
import InputComponent from 'components/inputComponent/inputComponent';
import {
    SUCCESS_STATUS,
    PROFILE_EVENTS,
    UNAUTHORIZED_STATUS,
    INTERNAL_ERROR_STATUS,
    DEFAULT_AVATAR,
    PROFILE_INPUTS,
} from 'libs/constants';
import InputErrorComponent from 'components/inputErrorComponent/inputErrorComponent';

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
                console.log(err);
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

        const dataForm = this.root.getElementsByClassName('auth-form')[0];
        dataForm.addEventListener('submit', this.onSubmit.bind(this));
        const dataInputs = dataForm.getElementsByClassName('inputs')[0];
        PROFILE_INPUTS.profile.forEach((input) => {
            const inputComponent = new InputComponent(input);
            dataInputs.appendChild(inputComponent.render());

            const inputErrorComponent = new InputErrorComponent(inputComponent.getName());
            dataInputs.appendChild(inputErrorComponent.render());
        });

        const modalForm = this.root.getElementsByClassName('auth-form')[1];
        modalForm.addEventListener('submit', this.onModalSubmit.bind(this));
        const modalInputs = modalForm.getElementsByClassName('inputs')[0];
        PROFILE_INPUTS.modal.forEach((input) => {
            const inputComponent = new InputComponent(input);
            modalInputs.appendChild(inputComponent.render());

            const inputErrorComponent = new InputErrorComponent(inputComponent.getName());
            modalInputs.appendChild(inputErrorComponent.render());
        });

        this.email = this.data.email;
        document.getElementById('email').value = this.email;

        this.username = this.data.username;
        document.getElementById('login').value = this.username;

        this.avatar = this.root.getElementsByClassName('user-avatar')[0];

        this.msgElement = this.root.getElementsByClassName(
            'user-avatar__msg'
        )[0];

        document.getElementById('avatar-input').addEventListener(
            'change',
            this.onUploadAvatar.bind(this)
        );

        this.modalWrapper = this.root.getElementsByClassName(
            'modal-password-wrapper'
        )[0];

        this.root.getElementsByClassName(
            'user-settings__change-password'
        )[0].addEventListener(
            'click',
            this.openChangePasswordModal.bind(this)
        );

        Array.from(this.root.getElementsByClassName('auth-form__eye'))
            .forEach((elem) => {
                elem.addEventListener('click', passwordToggler);
            });

        this.root.getElementsByClassName(
            'modal-password__close'
        )[0].addEventListener(
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
     * @param {object} event
     */
    onSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const validationResult = validation(form);

        if (!validationResult) {
            return;
        }

        const login = form.getElementsByClassName('auth-form__input_login')[0];
        const email = form.getElementsByClassName('auth-form__input_email')[0];

        Api.updateUser({
            login: login.value,
            email: email.value,
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.username = login.value;
                    this.email = email.value;
                    this.showMessage('Данные успешно изменены');
                } else if (res.status === INTERNAL_ERROR_STATUS) {
                    return Promise.reject(res);
                } else {
                    login.value = this.username;
                    email.value = this.email;
                    this.showMessage('Такой пользователь уже существует', true);
                }
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    /**
     * Вызывается при подтвреждении изменения пароля
     * @param {object} event
     */
    onModalSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const validationResult = validation(form);

        if (!validationResult) {
            return;
        }

        const password = form.getElementsByClassName(
            'auth-form__input_password'
        )[0];
        const repeatPassword = form.getElementsByClassName(
            'auth-form__input_repeat-password'
        )[0];

        if (password.value !== repeatPassword.value) {
            this.root.getElementsByClassName('modal-password')[0]
                .classList.add('modal-password_error');
            const formError = this.root.getElementsByClassName('modal-error')[0];
            formError.style.opacity = '1';
            formError.innerHTML = 'Пароли не совпадают';
            return;
        }

        Api.updateUser({
            password: password.value,
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
                    return res.json()
                        .then((res) => {
                            this.avatar.style.backgroundImage =
                                `url(http://64.225.100.179:8080/image/${res.body})`;
                            this.showMessage('Аватар загружен');
                        });
                } else if (res.status === INTERNAL_ERROR_STATUS) {
                    return Promise.reject(res);
                } else {
                    this.showMessage('Ошибка при загрузке аватара', true);
                }
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
        this.root.getElementsByClassName('auth-form__input_password')[0].value = '';
        this.root.getElementsByClassName('auth-form__input_repeat-password')[0].value = '';
        this.root.getElementsByClassName('modal-password')[0]
            .classList.remove('modal-password_error');
        this.root.getElementsByClassName('modal-error')[0]
            .style.opacity = '0';
        this.root.getElementsByClassName('auth-form__input-error_password')[0]
            .classList.remove('auth-form__input-error_active');
        this.root.getElementsByClassName('auth-form__input-border_password')[0]
            .classList.remove('auth-form__input-border_error');
        this.modalWrapper.style.visibility = 'hidden';
        document.body.style.overflow = 'auto';
    }
}
