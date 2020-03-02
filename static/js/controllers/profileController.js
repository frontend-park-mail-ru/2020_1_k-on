import ProfileView from '../views/profileView/profileView';
import EventBus from '../libs/eventBus';

export default class ProfileController {
    constructor(router) {
        this.router = router;
        this.eventBus = new EventBus();
        this.eventBus.subscribe('unauthUser', () => {
            this.router.change('/login');
        });

        this.view = new ProfileView(this.eventBus);
    }
}
