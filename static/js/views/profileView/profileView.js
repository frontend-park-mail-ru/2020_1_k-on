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
    HOST_ADDRESS,
    PROFILE_TABS,
} from 'libs/constants';
import {switchTheme} from 'libs/theme';

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
                            `${HOST_ADDRESS}/static/img/${this.data.image}`;
                        this.data.isLightTheme = localStorage.getItem('theme') === 'light';
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

        this.root.getElementsByClassName('user-action_subscriptions')[0].addEventListener(
            'click',
            this.onSubscriptions.bind(this),
        );

        this.root.getElementsByClassName('user-action_theme')[0].addEventListener(
            'change',
            this.onTheme.bind(this),
        );

        this.onSubscriptions.call(this);
    }

    onTheme() {
        switchTheme();
        const themeMsgElem = this.root.getElementsByClassName('user-action__name_theme')[0];

        themeMsgElem.innerText = themeMsgElem.innerText === 'Светлый' ? 'Темный' : 'Светлый';
    }

    onSettings() {
        if (this.currentTab === PROFILE_TABS.settings) {
            return;
        }

        this.currentTab = PROFILE_TABS.settings;

        this.actionContainer.innerHTML = '';
        const profileSettingsComponent = new ProfileSettingsComponent({
            email: this.data.email,
            login: this.data.username,
            eventBus: this.eventBus,
        });
        this.actionContainer.appendChild(profileSettingsComponent.render());
    }

    onPlaylist() {
        if (this.currentTab === PROFILE_TABS.playlists) {
            return;
        }

        this.currentTab = PROFILE_TABS.playlists;

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

    onSubscriptions() {
        if (this.currentTab === PROFILE_TABS.subscriptions) {
            return;
        }

        this.currentTab = PROFILE_TABS.subscriptions;

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
                const avatarPath = `url(${HOST_ADDRESS}/static/img/${res.body})`;

                this.avatar.style.backgroundImage = avatarPath;
                const navbarAvatar = document.getElementsByClassName('navbar__link_avatar')[0];
                navbarAvatar.style.backgroundImage = avatarPath;

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

    close() {
        this.currentTab = '';
        super.close();
    }
}
