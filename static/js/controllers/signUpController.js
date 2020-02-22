import validation from '../components/validation';
import signupView from '../views/signupView';

export default class SignUpController {
    view = signupView;
    validation = validation;

    render() {
        const container = document.getElementById('container');
        container.innerHTML = '';

        const signupItem = document.createElement('div');
        signupItem.className = 'auth-page';
        signupItem.innerHTML = this.view;

        container.appendChild(signupItem);

        this.validation();
    }
}
