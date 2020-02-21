import Input from './Input';

const validation = () => {
    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', (evt) => {
        let isValidationError = false;

        const inputs = form.getElementsByClassName('auth-form__input');

        for (let inputItem of inputs) {
            const inputClassItem = new Input(inputItem.id);


            const inputError = form.getElementsByClassName(`auth-form__error_${inputClassItem.inputName}`)[0];

            if (!inputClassItem.regex.test(inputItem.value)) {
                inputError.textContent = inputClassItem.errorMsg;
                inputError.style.visibility = 'visible';
                isValidationError = true;
            }
        }

        if (isValidationError) {
            evt.preventDefault();
        }
    });
};

export default validation;
