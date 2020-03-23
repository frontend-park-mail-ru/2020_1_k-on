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

export const DEFAULT_FILTERS = {
    genre: {
        name: 'Все жанры',
        reference: 'all',
    },
    year: {
        name: 'Все годы',
        reference: 'all',
    },
    ordering: {
        name: 'По рейтингу',
        reference: 'rating',
    },
};
