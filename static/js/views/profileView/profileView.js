import View from 'views/view';
import validation from 'libs/validation';
import template from './profileView.tmpl.xml';
import Api from 'libs/api';
import {
    SUCCESS_STATUS,
    PROFILE_EVENTS,
} from 'libs/constants';

const data = {
    profile: {
        login: 'AliceSitedge',
        email: 'a.seledkina@mail.ru',
        avatar: '/static/img/avatar.jpg',
    },
    lists: [
        {
            name: 'Смотрю',
            series: [
                {
                    'name': 'Игра престолов',
                    'seasons': '7/8',
                    'rating': '-',
                },
                {
                    'name': 'Твин Пикс',
                    'seasons': '2/3',
                    'rating': '-',
                },
            ],
        },
        {
            name: 'Просмотрено',
            series: [
                {
                    'name': 'Игра престолов',
                    'seasons': '7/8',
                    'rating': '8',
                },
                {
                    'name': 'Твин Пикс',
                    'seasons': '2/3',
                    'rating': '9',
                },
                {
                    'name': 'Друзья',
                    'seasons': '1/10',
                    'rating': '-',
                },
                {
                    'name': 'Во все тяжкие',
                    'seasons': '5/5',
                    'rating': '7',
                },
            ],
        },
    ],
};

export default class ProfileView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.data = data;
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
                    res.json()
                        .then((res) => {
                            this.email = res.email;
                            this.login = res.username;
                            this.avatarBase64 = res.avatar;
                            this.onSuccess();
                        });
                } else {
                    this.eventBus.publish(PROFILE_EVENTS.unauthUser);
                }
            });
    }

    /**
     * Добавляет обработчики событий и выполняет рендер
     */
    onSuccess() {
        if (this.avatarBase64 !== '') {
            this.data.profile.avatar = `
                "data:image/jpeg;base64,${this.avatarBase64}"
            `;
        }
        super.render(this.root);

        document.getElementById('login').value = this.login;
        document.getElementById('email').value = this.email;
        this.avatar = document.getElementById('avatar');

        this.onUploadImage = this.onUploadImage.bind(this);
        this.avatar.addEventListener('change', this.onUploadImage);

        this.onSubmit = this.onSubmit.bind(this);
        this.root.addEventListener('submit', this.onSubmit);
    }

    /**
     * Добавляет ошибку на форму с данными пользователя
     * (в случае ошибки изменения данных
     * @param {string} resErrMsg
     */
    onInvalidForm(resErrMsg) {
        const formError = this.element.getElementsByClassName(
            'auth-form__error'
        )[0];

        formError.textContent = resErrMsg;
        formError.style.visibility = 'visible';
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

        const password = document.getElementById('password').value;
        const passwordRepeat = document.getElementById(
            'password_repeat'
        ).value;

        if (password !== passwordRepeat) {
            this.onInvalidForm('Пароли не совпадают');
            return;
        }

        const login = document.getElementById('login').value;
        const email = document.getElementById('email').value;

        Api.updateUser(login, email, password)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json()
                        .then((res) => {
                            this.close();
                            this.render(this.root);
                        });
                } else {
                    res.json().then((res) =>
                        this.onInvalidForm(res.body.error)
                    );
                }
            });
    }

    /**
     * Обработчик на загрузку аватара пользователя
     * @param {object} event
     */
    onUploadImage(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            formData.append('file', file);
        }

        Api.uploadImage(formData)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

        const avatar = this.root.getElementsByClassName(
            'profile-block__avatar'
        )[0];
        avatar.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    }

    /**
     * Удаляет обработчики событий и очищает контент
     */
    close() {
        if (this.avatar !== undefined) {
            this.avatar.removeEventListener('change', this.onUploadImage);
        }
        if (this.avatar !== undefined) {
            this.root.removeEventListener('submit', this.onSubmit);
        }
        super.close();
    }
}
