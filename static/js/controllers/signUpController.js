import SignUpView from '../views/signUpView/signUpView';

export default class SignUpController {
    constructor(router) {
        this.view = new SignUpView(router);
    }
}
