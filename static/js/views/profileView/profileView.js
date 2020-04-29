import View from 'views/view';
import template from './profileView.tmpl.xml';
import Api from 'libs/api';
import ProfileSettingsComponent from 'components/profileSettingsComponent/profileSettingsComponent';
import PlaylistComponent from 'components/playlistComponent/playlistComponent';
import SubscriptionsComponent from 'components/subscriptionsComponent/subscriptionsComponent';
import {
    DEFAULT_AVATAR,
    PROFILE_EVENTS,
    SUCCESS_STATUS,
    UNAUTHORIZED_STATUS,
    PROFILE_MSGS,
    SHOW_MSG_TIMEOUT,
    SERVER_ADDRESS,
} from 'libs/constants';

export default class ProfileView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this.eventBus.subscribe(PROFILE_EVENTS.showMsg, this.showMessage.bind(this));
        this.eventBus.subscribe(PROFILE_EVENTS.updateUserData, this.updateUserData.bind(this));
    }

    render(root) {
        this.root = root;

        Api.getUserData()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        this.data = res.body;
                        this.data.avatar = this.data.image === '' ?
                            DEFAULT_AVATAR :
                            `${SERVER_ADDRESS}/image/${this.data.image}`;
                        super.render(root);
                        this.afterRender();
                    });
                } else if (res.status === UNAUTHORIZED_STATUS) {
                    this.eventBus.publish(PROFILE_EVENTS.unauthUser);
                } else {
                    return Promise.reject(res);
                }
            })
            .catch((err) => {
                console.error(`${err.status}: FAILED TO LOAD USER DATA`);
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    afterRender() {
        this.avatar = this.root.getElementsByClassName('user-avatar')[0];
        document.getElementById('avatar-input').addEventListener(
            'change',
            this.onUploadAvatar.bind(this),
        );

        this.msgElement = this.root.getElementsByClassName('user-avatar__msg')[0];

        this.actionContainer = this.root.getElementsByClassName('action-container')[0];

        this.root.getElementsByClassName('user-action_settings')[0].addEventListener(
            'click',
            this.onSettings.bind(this),
        );

        this.root.getElementsByClassName('user-action_playlists')[0].addEventListener(
            'click',
            this.onPlaylist.bind(this),
        );

        this.root.getElementsByClassName('user-action_stat')[0].addEventListener(
            'click',
            this.onStats.bind(this),
        );

        this.root.getElementsByClassName('user-action_subscriptions')[0].addEventListener(
            'click',
            this.onSubscriptions.bind(this),
        );
    }

    onSettings() {
        this.actionContainer.innerHTML = '';
        const profileSettingsComponent = new ProfileSettingsComponent({
            email: this.data.email,
            login: this.data.username,
            eventBus: this.eventBus,
        });
        this.actionContainer.appendChild(profileSettingsComponent.render());
    }

    onPlaylist() {
        this.actionContainer.innerHTML = '';

        Api.getUserPlaylists()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                res.body = res.body === null ? [] : res.body;
                const playlistComponent = new PlaylistComponent(res.body, this.eventBus);
                this.actionContainer.appendChild(playlistComponent.render());
            })
            .catch((err) => {
                this.showMessage(PROFILE_MSGS.error_playlists_upload, true);
                console.error(`${err.status}: FAILED TO LOAD PLAYLISTS`);
            });
    }

    onStats() {
        this.actionContainer.innerHTML = 'Здесь будет статистика';
    }

    onSubscriptions() {
        this.actionContainer.innerHTML = '';

        Api.getSubscriptions()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                res.body = res.body === null ? [] : res.body;
                const subscriptionsComponent = new SubscriptionsComponent(res.body, this.eventBus);
                this.actionContainer.appendChild(subscriptionsComponent.render());
            })
            .catch((err) => {
                this.showMessage(PROFILE_MSGS.error_subscriptions_upload, true);
                console.error(`${err.status}: FAILED TO LOAD SUBSCRIPTIONS`);
            });
    }

    onUploadAvatar(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
            formData.append('file', file);
        }

        Api.uploadUserAvatar(formData)
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.avatar.style.backgroundImage =
                    `url(${SERVER_ADDRESS}/image/${res.body})`;
                this.showMessage(PROFILE_MSGS.success_avatar_upload);
            })
            .catch((err) => {
                this.showMessage(PROFILE_MSGS.error_avatar_upload, true);
                console.error(`${err.status}: FAILED TO UPLOAD AVATAR`);
            });
    }

    showMessage(msg, isError = false) {
        this.msgElement.classList.replace(
            `user-avatar__msg_${isError ? 'success' : 'error'}`,
            `user-avatar__msg_${isError ? 'error' : 'success'}`,
        );
        this.msgElement.textContent = msg;
        this.msgElement.style.opacity = '1';

        setTimeout(() => {
            this.msgElement.style.opacity = '0';
        }, SHOW_MSG_TIMEOUT);
    }

    updateUserData(username = '', email = '') {
        this.data.username = username;
        this.data.email = email;
        this.root.getElementsByClassName('user-avatar__name')[0].innerText = username;
        document.getElementsByClassName('navbar__link_username')[0].textContent = username;
    }
}
