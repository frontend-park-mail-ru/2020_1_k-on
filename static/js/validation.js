const inputs = {
    login: {
        class: 'auth-form__input_login',
        regex: '^[a-zA-Z][a-zA-Z0-9-_.]{4,15}$',
        error_id: 'login_error',
        error_msg: `Логин должен содержать от 4 до 15 символов
                     и состоять из цифр и латинских символов`,
    },
    password: {
        class: 'auth-form__input_password',
        regex: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{4,15}$',
        error_id: 'password_error',
        error_msg: `Пароль должен содержать 1 заглавную букву,
                    1 строчную букву и одну цифру,
                    а также содержать от 4 до 15 символов`,
    },
};

const form = document.querySelector('.auth-form');

form.addEventListener('submit', (evt) => {
    let isValidationError = false;

    for (const value of Object.values(inputs)) {
        const inputItem = form.querySelector(`.${value.class}`);
        if (inputItem == null) {
            continue;
        }

        const inputRegex = RegExp(value.regex);
        const inputError = form.querySelector(`#${value.error_id}`);

        if (!inputRegex.test(inputItem.value)) {
            inputError.textContent = value.error_msg;
            inputError.style.visibility = 'visible';
            isValidationError = true;
        }
    }

    if (isValidationError) {
        evt.preventDefault();
    }
});
