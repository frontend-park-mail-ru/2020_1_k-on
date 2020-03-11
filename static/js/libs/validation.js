import Input from './Input';

/**
 * Функция для валидации форм
 * @return {boolean}
 */
const validation = () => {
    const form = document.getElementsByClassName('form')[0];

    let isValidationError = false;

    const inputs = form.getElementsByClassName('form__input');

    for (const inputItem of inputs) {
        if (inputItem.id === 'avatar') {
            continue;
        }
        const inputClassItem = new Input(inputItem.id);

        const inputError = form.getElementsByClassName(
            `form__error-input_${inputClassItem.inputName}`
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
