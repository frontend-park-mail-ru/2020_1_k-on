import View from 'views/view';
import validation from 'libs/validation';
import template from './profileSettingsView.tmpl.xml';
import Api from 'libs/api';
import {
    SUCCESS_STATUS,
    PROFILE_EVENTS,
    UNAUTHORIZED_STATUS,
    INTERNAL_ERROR_STATUS,
} from 'libs/constants';

export default class ProfileSettingsView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.validation = validation;
    }

    /**
     * При рендере отправляет запрос на получение данных пользователя
     * в случае успеха - выполняет рендер,
     * в случае ошибки - направляет на страницу логина
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
                this.data.avatar = this.data.image;
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
        if (this.data.avatar !== undefined) {
            this.data.avatar = '/static/img/avatar.jpg';
        }

        super.render(this.root);

        this.email = this.data.email;
        document.getElementById('email').value = this.email;

        this.username = this.data.username;
        document.getElementById('login').value = this.username;

        this.avatar = this.root.getElementsByClassName('user-avatar')[0];

        this.msgElement = this.root.getElementsByClassName(
            'user-avatar__msg'
        )[0];

        this.avatarInput = document.getElementById('avatar-input');
        this.avatarInput.addEventListener(
            'change',
            this.onUploadAvatar.bind(this)
        );

        this.form = this.root.getElementsByClassName('auth-form')[0];
        this.form.addEventListener('submit', this.onSubmit.bind(this));
    }

    /**
     * Отображает сообщение пользователю при изменении данных
     * @param {string} msg
     * @param {boolean} isError
     */
    showMessage(msg, isError = false) {
        this.msgElement.classList.add(
            `user-avatar__msg_${isError ? 'error' : 'success'}`
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
        const validationResult = this.validation();

        if (!validationResult) {
            return;
        }

        const login = document.getElementById('login');
        const email = document.getElementById('email');

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
     * Обработчик на загрузку аватара пользователя
     * @param {object} event
     */
    onUploadAvatar(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            formData.append('image', file);
        }

        Api.uploadUserAvatar(formData)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    this.avatar.style.backgroundImage =
                        `url(${URL.createObjectURL(file)})`;
                    this.showMessage('Аватар загружен');
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
}
