import LoginView from '../views/loginView/loginView';

export default class LoginController {
    constructor(router) {
        this.view = new LoginView(router);
    }
}
