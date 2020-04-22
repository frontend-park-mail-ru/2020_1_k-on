import AuthView from 'views/authView/authView';
import Api from 'libs/api';
import {
    SIGN_UP_EVENTS,
    SIGN_UP_PAGE_DATA,
} from 'libs/constants';

export default class SignUpView extends AuthView {
    constructor(eventBus) {
        super({
            eventBus: eventBus,
            data: SIGN_UP_PAGE_DATA,
            onSuccessEvents: [
                SIGN_UP_EVENTS.signUpSuccess,
                SIGN_UP_EVENTS.renderForAuth,
            ],
            apiMethod: Api.doSignUp,
        });
    }
}
