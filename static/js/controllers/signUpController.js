import SignUpView from '../views/signUpView/signUpView';
import EventBus from '../libs/eventBus';

export default class SignUpController {
    constructor(router, globalEventBus) {
        this.router = router;
        this.globalEventBus = globalEventBus;
        this.eventBus = new EventBus();
        this.eventBus.subscribe('signUpSuccess', () => {
            this.router.change('/');
        });

        this.eventBus.subscribe(
            'renderForAuth',
            () => {
                this.globalEventBus.publish('renderForAuth');
            },
        );

        this.view = new SignUpView(this.eventBus);
    }
}
