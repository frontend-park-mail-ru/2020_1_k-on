export const SERVER_ADDRESS = 'http://64.225.100.179:8080';

export const SUCCESS_STATUS = 200;

export const NAVBAR_AUTH_ITEMS = {
    profile: 'Профиль',
    logout: 'Выйти',
};

export const NAVBAR_UNAUTH_ITEMS = {
    login: 'Войти',
    signup: 'Зарегистрироваться',
};

export const GLOBAL_EVENTS = {
    renderForAuth: 'renderFotAuth',
    renderForUnauth: 'renderForUnauth',
};

export const LOGIN_EVENTS = {
    renderForAuth: 'renderFotAuth',
    loginSuccess: 'loginSuccess',
};

export const SIGN_UP_EVENTS = {
    signUpSuccess: 'signUpSuccess',
    renderForAuth: 'renderForAuth',
};

export const PROFILE_EVENTS = {
    unauthUser: 'unauthUser',
};

export const MAX_BG_IMGS = 5;

export const BG_IMG_KEY = 'bg_img';

export const LOGIN_PAGE_DATA = {
    headline: 'Вход в аккаунт',
    inputs: [
        {
            name: 'login',
            placeholder: 'Логин',
            type: 'text',
            id: 'login',
            required: 'true',
            autofocus: 'true',
        },
        {
            name: 'password',
            placeholder: 'Пароль',
            type: 'password',
            id: 'password',
            required: 'true',
            autofocus: 'false',
        },
    ],
    button_text: 'Войти',
    no_account_msg: 'Еще нет аккаунта?',
    no_account_href: 'Зарегистрируйтесь!',
};

export const SIGN_UP_PAGE_DATA = {
    headline: 'Регистрация',
    inputs: [
        {
            name: 'login',
            placeholder: 'Логин',
            type: 'text',
            id: 'login',
            required: 'true',
            autofocus: 'true',
        },
        {
            name: 'email',
            placeholder: 'E-mail',
            type: 'email',
            id: 'email',
            required: 'true',
            autofocus: 'false',
        },
        {
            name: 'password',
            placeholder: 'Пароль',
            type: 'password',
            id: 'password',
            required: 'true',
            autofocus: 'false',
        },
    ],
    button_text: 'Зарегистрироваться',
    no_account_msg: 'Уже зарегистрированы?',
    no_account_href: 'Войдите в аккаунт!',
};

export const SLIDER_INTERVAL = 10000;
