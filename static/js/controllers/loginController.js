import validation from '../components/validation';
import loginView from '../views/loginView';

export default class LoginController {
    view = loginView;
    validation = validation;

    render() {
        const container = document.getElementById('container');
        container.innerHTML = '';

        const authItem = document.createElement('div');
        authItem.className = 'auth-page';
        authItem.innerHTML = this.view;

        container.appendChild(authItem);

        this.validation();
    }
}
