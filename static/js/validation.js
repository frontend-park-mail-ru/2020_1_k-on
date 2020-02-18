const form = document.querySelector('.auth-form');

form.addEventListener('submit', evt => {
    const login = document.querySelector('.auth-form__input_login');
    const password = document.querySelector('.auth-form__input_password');

    const login_error = document.querySelector('.auth-form__input_login ~ .auth-form__error');
    const password_error = document.querySelector('.auth-form__input_password ~ .auth-form__error');

    const login_regex = RegExp('^[a-zA-Z][a-zA-Z0-9-_.]{4,15}$');
    const password_regex = RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\\d]{4,15}$');

    let isValidationError = false;

    if (!login_regex.test(login.value)) {
        login_error.textContent = 'Логин должен содержать от 4 до 15 символов и состоять из цифр и латинских символов';
        login_error.style.visibility = 'visible';
        login.style.border = '1px solid red';
        isValidationError = true;
    }

    if (!password_regex.test(password.value)) {
        password_error.textContent = 'Пароль должен содержать 1 заглавную букву, 1 строчную букву и одну цифру,' +
            ' а также содержать от 4 до 15 символов';
        password_error.style.visibility = 'visible';
        password.style.border = '1px solid red';
        isValidationError = true;
    }

    if (isValidationError) {
        evt.preventDefault();
    }
});