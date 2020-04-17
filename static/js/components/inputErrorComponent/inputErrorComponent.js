import Component from 'components/component';

export default class InputErrorComponent extends Component {
    constructor(inputName) {
        super();

        this.element = document.createElement('div');
        this.element.classList.add(
            'auth-form__input-error',
            `auth-form__input-error_${inputName}`
        );
        this.element.id = `${inputName}_error`;
    }
}
