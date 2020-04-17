import LoginView from 'views/loginView/loginView';
import EventBus from 'libs/eventBus';
import {
    LOGIN_EVENTS,
    GLOBAL_EVENTS,
} from 'libs/constants';

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
        this.eventBus.subscribe(
            LOGIN_EVENTS.internalError,
            (code) => {
                this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
            }
        );

        this.view = new LoginView(this.eventBus);
    }
}
