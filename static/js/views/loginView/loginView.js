import AuthView from 'views/authView/authView';
import Api from 'libs/api';
import {
    LOGIN_EVENTS,
    LOGIN_PAGE_DATA,
} from 'libs/constants';

export default class LoginView extends AuthView {
    constructor(eventBus) {
        super({
            eventBus: eventBus,
            data: LOGIN_PAGE_DATA,
            onSuccessEvents: [
                LOGIN_EVENTS.renderForAuth,
                LOGIN_EVENTS.loginSuccess,
            ],
            apiMethod: Api.doLogin,
        });
    }
}
