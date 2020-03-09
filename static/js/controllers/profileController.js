import ProfileView from '../views/profileView/profileView';
import EventBus from '../libs/eventBus';
import {PROFILE_EVENTS} from '../libs/constants';

export default class ProfileController {
    constructor(router) {
        this.router = router;
        this.eventBus = new EventBus();
        this.eventBus.subscribe(PROFILE_EVENTS.unauthUser, () => {
            this.router.change('/login');
        });

        this.view = new ProfileView(this.eventBus);
    }
}
