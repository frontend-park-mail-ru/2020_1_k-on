import View from '../view';
import validation from '../../libs/validation';

const USER_AUTH = 200;
const SUCCESS_CHANGE = 200;
const FAIL_CHANGE = 403;

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
    constructor() {
        super();
        this._data = data;
        this.validation = validation;
    }

    render(root) {
        this.root = root;

        this.getUserData()
            .then((res) => {
                if (res.status === USER_AUTH) {
                    this.email = res.body.email;
                    this.login = res.body.login;
                    this.onSuccess();
                } else {
                    location.pathname = '/login';
                }
            });
    }

    getUserData() {
        return fetch('http://localhost:3000/user', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => res.json().then(
                (data) => (
                    {
                        status: res.status,
                        body: data,
                    }
                )
            )
            )
            .catch((error) => {
                console.log(error);
            });
    }

    onSuccess() {
        this.element.className = 'auth-page';
        this.tmpl = window.fest[
            'js/views/profileView/profileView.tmpl'
        ](this._data);
        super.render(this.root);

        document.getElementById('login').value = this.login;
        document.getElementById('email').value = this.email;

        this.onSubmit = this.onSubmit.bind(this);
        this.root.addEventListener('submit', this.onSubmit);
    }

    onInvalidForm(resErrMsg) {
        const formError = this.element.getElementsByClassName(
            'auth-form__error'
        )[0];

        formError.textContent = resErrMsg;
        formError.style.visibility = 'visible';
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.validation()) {
            const login = document.getElementById('login').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const passwordRepeat = document.getElementById(
                'password_repeat'
            ).value;

            if (password !== passwordRepeat) {
                this.onInvalidForm('Пароли не совпадают');
                return;
            }

            fetch('http://localhost:3000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'login': login,
                    'password': password,
                    'email': email,
                },
                ),
            })
                .then((res) => res.json().then(
                    (data) => (
                        {
                            status: res.status,
                            body: data,
                        }
                    )
                )
                )
                .then((res) => {
                    if (res.status === SUCCESS_CHANGE) {
                        this.email = res.body.email;
                        this.login = res.body.login;
                        this.close();
                        this.onSuccess();
                    } else if (res.status === FAIL_CHANGE) {
                        this.onInvalidForm(res.body.error);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    close() {
        this.root.removeEventListener('submit', this.onSubmit);
        super.close();
    }
}
