export const SERVER_ADDRESS = 'http://64.225.100.179:8080';

export const SUCCESS_STATUS = 200;
export const BAD_REQUEST_STATUS = 400;
export const UNAUTHORIZED_STATUS = 401;
export const FORBIDDEN_STATUS = 403;
export const NOT_FOUND_STATUS = 404;
export const INTERNAL_ERROR_STATUS = 500;

export const INTERNAL_ERROR_MSG = 'Произошла внутренняя ошибка сервера';
export const NOT_FOUND_ERROR_MSG = 'Сраница не найдена';

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
    internalError: 'internalError',
};

export const LOGIN_EVENTS = {
    renderForAuth: 'renderFotAuth',
    loginSuccess: 'loginSuccess',
    internalError: 'internalError',
};

export const SIGN_UP_EVENTS = {
    signUpSuccess: 'signUpSuccess',
    renderForAuth: 'renderForAuth',
    internalError: 'internalError',
};

export const PROFILE_EVENTS = {
    unauthUser: 'unauthUser',
    internalError: 'internalError',
    showMsg: 'showMsg',
    updateUserData: 'updateUserData',
};

export const PROFILE_MSGS = {
    success_avatar_upload: 'Аватар загружен',
    error_avatar_upload: 'Ошибка при загрузке аватара',
    settings_update: 'Данные успешно изменены',
    user_exists: 'Такой пользователь уже существует',
    passwords_not_match: 'Пароли не совпадают',
    updatePassword: 'Пароль успешно изменен',
};

export const INDEX_EVENTS = {
    internalError: 'internalError',
};

export const LIST_EVENTS = {
    internalError: 'internalError',
    updateList: 'updateList',
    genrePushHistory: 'genrePushHistory',
};

export const MOVIE_EVENTS = {
    internalError: 'internalError',
};

export const PERSON_EVENTS = {
    internalError: 'internalError',
};

export const MAX_BG_IMGS = 5;

export const BG_IMG_KEY = 'bg_img';

export const LOGIN_PAGE_DATA = {
    headline: 'Вход в аккаунт',
    inputs: [
        {
            name: 'login',
            label: 'Логин',
            type: 'text',
            id: 'login',
            required: 'true',
            autofocus: 'true',
        },
        {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            id: 'password',
            required: 'true',
            autofocus: 'false',
        },
    ],
    button_text: 'Войти',
    no_account_msg: 'Еще нет аккаунта?',
    no_account_href_txt: 'Зарегистрируйтесь!',
    no_account_href: '/signup',
    messages: {
        bad_request: 'Пользователь не найден',
        forbidden: 'Вы уже авторизованы',
    },
};

export const SIGN_UP_PAGE_DATA = {
    headline: 'Регистрация',
    inputs: [
        {
            name: 'login',
            label: 'Логин',
            type: 'text',
            id: 'login',
            required: 'true',
            autofocus: 'true',
        },
        {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            id: 'email',
            required: 'true',
            autofocus: 'false',
        },
        {
            name: 'password',
            label: 'Пароль',
            type: 'password',
            id: 'password',
            required: 'true',
            autofocus: 'false',
        },
    ],
    button_text: 'Зарегистрироваться',
    no_account_msg: 'Уже зарегистрированы?',
    no_account_href_txt: 'Войдите в аккаунт!',
    no_account_href: '/login',
    messages: {
        bad_request: 'Пользователь уже существует',
        forbidden: 'Вы уже авторизованы',
    },
};

export const SLIDER_INTERVAL = 10000;
export const SLIDER_DISTANCE = 400;

export const MAX_RATING = 10;

export const DEFAULT_AVATAR = '/static/img/avatar.svg';

export const RANDOM_SHUFFLE_VALUE = 0.5;

export const PROFILE_SETTINGS_INPUTS = {
    settings: [
        {
            name: 'login',
            label: 'Логин',
            type: 'text',
            id: 'login',
            required: 'true',
            autofocus: 'true',
        },
        {
            name: 'email',
            label: 'E-mail',
            type: 'email',
            id: 'email',
            required: 'true',
            autofocus: 'false',
        },
    ],
    password_modal: [
        {
            name: 'password',
            label: 'Новый пароль',
            type: 'password',
            id: 'password',
            required: 'true',
            autofocus: 'false',
        },
        {
            name: 'repeat-password',
            label: 'Повтор пароля',
            type: 'password',
            id: 'repeat-password',
            required: 'true',
            autofocus: 'false',
        },
    ],
};
