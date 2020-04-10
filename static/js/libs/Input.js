const VALIDATION_ERR_MESSAGES = {
    LOGIN: `Логин должен содержать минимум 6 символов, 
            состоять из цифр и латинских букв и начинаться с буквы`,
    PASSWORD: `Пароль должен содержать минимум 6 символов и состоять
               из латинских букв и цифр`,
    EMAIL: 'Неправильный формат электронной почты',
};

const INPUTS = {
    login: {
        regex: /^[a-zA-Z][a-zA-Z0-9]{5,}$/,
        inputName: 'login',
        errorMsg: VALIDATION_ERR_MESSAGES.LOGIN,

    },
    password: {
        regex: /[a-zA-Z0-9]{6,}$/,
        inputName: 'password',
        errorMsg: VALIDATION_ERR_MESSAGES.PASSWORD,
    },
    email: {
        regex: /^\S+@\S+\.\S+$/,
        inputName: 'email',
        errorMsg: VALIDATION_ERR_MESSAGES.EMAIL,
    },
};

export default class Input {
    constructor(inputID) {
        ({
            regex: this.regex,
            inputName: this.inputName,
            errorMsg: this.errorMsg,
        } = INPUTS[inputID]);
    }
}
