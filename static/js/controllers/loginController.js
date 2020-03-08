import LoginView from '../views/loginView/loginView';
import EventBus from '../libs/eventBus';

export default class LoginController {
    constructor(router, globalEventBus) {
        this.router = router;
        this.globalEventBus = globalEventBus;
        this.eventBus = new EventBus();
        this.eventBus.subscribe('loginSuccess', () => {
            this.router.change('/');
        });

        this.eventBus.subscribe(
            'renderForAuth',
            () => {
                this.globalEventBus.publish('renderForAuth');
            },
        );

        this.view = new LoginView(this.eventBus);
    }
}
