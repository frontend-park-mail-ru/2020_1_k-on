import LoginView from '../views/loginView/loginView';
import EventBus from '../libs/eventBus';
import {GLOBAL_EVENTS} from '../libs/constants';
import {LOGIN_EVENTS} from '../libs/constants';

export default class LoginController {
    constructor(router, globalEventBus) {
        this.router = router;
        this.globalEventBus = globalEventBus;

        this.eventBus = new EventBus();
        this.eventBus.subscribe(LOGIN_EVENTS.loginSuccess, () => {
            this.router.change('/');
        });
        this.eventBus.subscribe(
            LOGIN_EVENTS.renderForAuth,
            () => {
                this.globalEventBus.publish(GLOBAL_EVENTS.renderForAuth);
            },
        );

        this.view = new LoginView(this.eventBus);
    }
}
