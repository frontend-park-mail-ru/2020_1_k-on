import Input from 'libs/Input';

/**
 * Функция для валидации форм
 * @return {boolean}
 */
const validation = () => {
    const form = document.getElementsByClassName('auth-form')[0];

    let isValidationError = false;

    const inputs = form.getElementsByClassName('auth-form__input');

    for (const inputItem of inputs) {
        if (inputItem.id === 'avatar') {
            continue;
        }
        const inputClassItem = new Input(inputItem.id);

        const inputError = form.getElementsByClassName(
            `auth-form__input-error_${inputClassItem.inputName}`
        )[0];

        if (!inputClassItem.regex.test(inputItem.value)) {
            inputError.textContent = inputClassItem.errorMsg;
            inputError.style.visibility = 'visible';
            isValidationError = true;
        } else {
            inputError.textContent = '';
            inputError.style.visibility = 'hidden';
        }
    }

    return !isValidationError;
};

export default validation;
