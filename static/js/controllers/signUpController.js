import SignUpView from '../views/signUpView/signUpView';
import EventBus from '../libs/eventBus';

export default class SignUpController {
    constructor(router) {
        this.router = router;
        this.eventBus = new EventBus();
        this.eventBus.subscribe('signUpSuccess', () => {
            this.router.change('/');
        });

        this.view = new SignUpView(this.eventBus);
    }
}
