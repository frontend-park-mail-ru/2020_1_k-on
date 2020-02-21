const VALIDATION_ERR_MESSAGES = {
    LOGIN: `Логин должен содержать от 4 до 15 символов
            и состоять из цифр и латинских символов`,
    PASSWORD: `Пароль должен содержать 1 заглавную букву,
               1 строчную букву и одну цифру,
               а также содержать от 4 до 15 символов`,
    EMAIL: `Неправильный формат электронной почты`,
};

const INPUTS = {
    login: {
        regex: /^[a-zA-Z][a-zA-Z0-9-_.]{4,15}$/,
        inputName: 'login',
        errorMsg: VALIDATION_ERR_MESSAGES.LOGIN

    },
    password: {
        regex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z[0-9]{4,15}$/,
        inputName: 'password',
        errorMsg: VALIDATION_ERR_MESSAGES.PASSWORD
    },
    email: {
        regex: /^\S+@\S+\.\S+$/,
        inputName: 'email',
        errorMsg: VALIDATION_ERR_MESSAGES.EMAIL
    }
};

export default class Input {
    constructor(inputID) {
        ({
            regex: this.regex,
            inputName: this.inputName,
            errorMsg: this.errorMsg
        } = INPUTS[inputID]);
    }
}
