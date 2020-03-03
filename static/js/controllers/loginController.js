import LoginView from '../views/loginView/loginView';
import EventBus from '../libs/eventBus';

export default class LoginController {
    constructor(router) {
        this.router = router;
        this.eventBus = new EventBus();
        this.eventBus.subscribe('loginSuccess', () => {
            this.router.change('/');
        });

        this.view = new LoginView(this.eventBus);
    }
}
