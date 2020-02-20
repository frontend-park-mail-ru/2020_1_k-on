const inputOptions = {
    'auth-form__input auth-form__input_login': {
        regex: RegExp(
            '^[a-zA-Z][a-zA-Z0-9-_.]{4,15}$'
        ),
        errorID: 'login_error',
        errorMsg: `Логин должен содержать от 4 до 15 символов
                   и состоять из цифр и латинских символов`

    },
    'auth-form__input auth-form__input_password': {
        regex: RegExp(
            '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{4,15}$'
        ),
        errorID: 'password_error',
        errorMsg: `Пароль должен содержать 1 заглавную букву,
                   1 строчную букву и одну цифру,
                   а также содержать от 4 до 15 символов`
    },
};

class Input {
    constructor(inputClass) {
        ({
            regex: this.regex,
            errorID: this.errorID,
            errorMsg: this.errorMsg
        } = inputOptions[inputClass]);
    }
}

export default Input;
