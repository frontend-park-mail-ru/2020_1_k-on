import SignUpView from 'views/signUpView/signUpView';
import EventBus from 'libs/eventBus';
import {
    GLOBAL_EVENTS,
    SIGN_UP_EVENTS,
} from 'libs/constants';

export default class SignUpController {
    constructor(router, globalEventBus) {
        this.router = router;
        this.globalEventBus = globalEventBus;
        this.eventBus = new EventBus();
        this.eventBus.subscribe(SIGN_UP_EVENTS.signUpSuccess, () => {
            this.router.change('/');
        });
        this.eventBus.subscribe(
            SIGN_UP_EVENTS.renderForAuth,
            () => {
                this.globalEventBus.publish(GLOBAL_EVENTS.renderForAuth);
            },
        );
        this.eventBus.subscribe(
            SIGN_UP_EVENTS.internalError,
            (code) => {
                this.globalEventBus.publish(GLOBAL_EVENTS.internalError, code);
            }
        );

        this.view = new SignUpView(this.eventBus);
    }
}
