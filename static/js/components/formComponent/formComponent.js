import Component from 'components/component';
import template from './formComponent.tmpl.xml';
import InputComponent from 'components/inputComponent/inputComponent';
import InputErrorComponent from 'components/inputErrorComponent/inputErrorComponent';
import passwordToggler from 'libs/passwordToggler';
import validation from 'libs/validation';

export default class FormComponent extends Component {
    /**
     *
     * @param {Array} inputs
     * @param {string} buttonText
     * @param {boolean} noValidate
     * @param {function} onSubmitCallback
     */
    constructor({
        inputs = [],
        buttonText = 'Отправить',
        noValidate = true,
        onSubmitCallback = () => null,
        isVkAuth = false,
        onVkAuthCallback = () => null,
    } = {}) {
        super(template);

        this.inputs = inputs;
        this.onSubmitCallback = onSubmitCallback;
        this.onVkAuthCallback = onVkAuthCallback;
        this.isVkAuth = isVkAuth;

        this.data = {
            buttonText: buttonText,
            isVkAuth: isVkAuth,
        };

        this.element = document.createElement('form');
        this.element.classList.add('auth-form');
        this.element.noValidate = noValidate;
    }

    afterRender() {
        const inputs = this.element.getElementsByClassName('inputs')[0];
        this.inputs.forEach((input) => {
            const inputComponent = new InputComponent(input);
            inputs.appendChild(inputComponent.render());
            const inputErrorComponent = new InputErrorComponent(inputComponent.getName());

            inputs.appendChild(inputErrorComponent.render());
        });

        for (const elem of this.element.getElementsByClassName('auth-form__eye')) {
            elem.addEventListener('click', passwordToggler);
        }

        this.element.addEventListener('submit', this.onSubmit.bind(this));

        if (this.isVkAuth) {
            const vkAuthButton = this.element.getElementsByClassName(
                'auth-form__vk-login-button'
            )[0];
            vkAuthButton.addEventListener('click', this.onVkAuthCallback.bind(this));
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const validationResult = validation(this.element);

        if (!validationResult) {
            return;
        }

        this.onSubmitCallback(this.getInputsValue());
    }

    getInputsValue() {
        const inputsValue = {};
        this.inputs.forEach((input) => {
            inputsValue[input.id] = this.element.getElementsByClassName(
                `auth-form__input_${input.name}`
            )[0].value;
        });

        return inputsValue;
    }

    setInputValue(name, value) {
        this.element.getElementsByClassName(`auth-form__input_${name}`)[0].value = value;
    }

    clearForm() {
        this.inputs.forEach((input) => {
            this.element.getElementsByClassName(`auth-form__input_${input.name}`)[0].value = '';

            this.element.getElementsByClassName(`auth-form__input-error_${input.name}`)[0]
                .classList.remove('auth-form__input-error_active');

            this.element.getElementsByClassName(`auth-form__input-border_${input.name}`)[0]
                .classList.remove('auth-form__input-border_error');
        });
    }
}
