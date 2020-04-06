import ProfileSettingsView from 'views/profileSettingsView/profileSettingsView';
import ProfileView from 'views/profileView/profileView';
import EventBus from 'libs/eventBus';
import {
    GLOBAL_EVENTS,
    PROFILE_EVENTS,
} from 'libs/constants';

export default class ProfileController {
    constructor(router, globalEventBus) {
        this.router = router;
        this.globalEventBus = globalEventBus;

        this.eventBus = new EventBus();
        this.eventBus.subscribe(PROFILE_EVENTS.unauthUser, () => {
            this.router.change('/login');
        });
        this.eventBus.subscribe(
            PROFILE_EVENTS.logout,
            () => {
                this.globalEventBus.publish(GLOBAL_EVENTS.renderForUnauth);
            },
        );

        this.settingsView = new ProfileSettingsView(this.eventBus);
        this.view = new ProfileView(this.eventBus);
    }
}
