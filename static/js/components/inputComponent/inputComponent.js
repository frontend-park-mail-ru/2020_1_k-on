import template from './inputComponent.tmpl.xml';

export default class InputComponent {
    constructor({
        label = 'Label',
        name = 'input',
        type = 'text',
        id = 'input',
        required = 'false',
        autofocus = 'false',
    } = {}) {
        this.tmpl = template;
        this.data = {
            label: label,
            name: name,
            type: type,
            id: id,
            required: required,
            autofocus: autofocus,
        };
    }

    render(root) {
        this.root = root;

        this.input = document.createElement('div');
        this.input.classList.add('auth-form__input_wrapper');
        this.input.innerHTML += this.tmpl(this.data);

        this.error = document.createElement('div');
        this.error.classList.add(
            'auth-form__input-error',
            `auth-form__input-error_${this.data.name}`
        );
        this.error.id = `${this.data.name}_error`;

        this.root.appendChild(this.input);
        this.root.appendChild(this.error);
    }
}
