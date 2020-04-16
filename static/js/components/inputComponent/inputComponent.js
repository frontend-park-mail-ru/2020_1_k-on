import Component from 'components/component';
import template from './inputComponent.tmpl.xml';

export default class InputComponent extends Component {
    constructor({
        label = null,
        name = 'input',
        type = 'text',
        id = 'input',
        required = 'false',
        autofocus = 'false',
    } = {}) {
        super(template);

        this.data = {
            label: label,
            name: name,
            type: type,
            id: id,
            required: required,
            autofocus: autofocus,
        };

        this.element = document.createElement('div');
        this.element.classList.add('auth-form__input_wrapper');
    }

    getName() {
        return this.data.name;
    }
}
