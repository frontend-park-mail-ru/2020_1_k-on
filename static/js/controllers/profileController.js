import ProfileView from '../views/profileView/profileView';

export default class ProfileController {
    constructor(router) {
        this.view = new ProfileView(router);
    }
}
