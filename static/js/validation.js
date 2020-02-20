import Input from './Input';

const validation = () => {
    const inputs = {
        login: new Input(
            'auth-form__input_login',
            RegExp(
                '^[a-zA-Z][a-zA-Z0-9-_.]{4,15}$'
            ),
            'login_error',
            `Логин должен содержать от 4 до 15 символов
                     и состоять из цифр и латинских символов`
        ),
        password: new Input(
            'auth-form__input_password',
            RegExp(
                '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{4,15}$'
            ),
            'password_error',
            `Пароль должен содержать 1 заглавную букву,
                    1 строчную букву и одну цифру,
                    а также содержать от 4 до 15 символов`
        ),
    };

    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', (evt) => {
        let isValidationError = false;

        for (const value of Object.values(inputs)) {
            const inputItem = form.querySelector(`.${value.inputClass}`);
            if (inputItem === null) {
                continue;
            }

            const inputError = form.querySelector(`#${value.errorId}`);

            if (!value.regex.test(inputItem.value)) {
                inputError.textContent = value.errorMsg;
                inputError.style.visibility = 'visible';
                isValidationError = true;
            }
        }

        if (isValidationError) {
            evt.preventDefault();
        }
    });
};

validation();
