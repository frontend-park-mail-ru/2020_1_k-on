import Input from './Input';

const validation = () => {
    const form = document.querySelector('.auth-form');

    form.addEventListener('submit', (evt) => {
        let isValidationError = false;

        const inputs = form.getElementsByTagName('input');

        for (let inputItem of inputs) {
            const inputClassItem = new Input(inputItem.className);

            const inputError = form.querySelector(`#${inputClassItem.errorID}`);

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
