import View from 'views/view';
import template from './profileView.tmpl.xml';
import Api from 'libs/api';
import ProfileSettingsComponent from 'components/profileSettingsComponent/profileSettingsComponent';
import {
    DEFAULT_AVATAR,
    INTERNAL_ERROR_STATUS,
    PROFILE_EVENTS,
    SUCCESS_STATUS,
    UNAUTHORIZED_STATUS,
    PROFILE_MSGS,
} from 'libs/constants';

// const cardList = [
//     {
//         type: 'films',
//         russianName: 'Навстречу Тьме',
//         id: '1',
//         image: '/static/img/series2.jpg',
//         ageLimit: '18',
//         year: '2018',
//         country: 'США',
//         mainGenre: 'Боевики',
//     },
//     {
//         type: 'films',
//         russianName: 'Столкновение',
//         id: '1',
//         image: '/static/img/series3.jpg',
//         ageLimit: '16',
//         year: '2018 - 2019',
//         country: 'Турция',
//         mainGenre: 'Триллеры',
//     },
//     {
//         type: 'films',
//         russianName: 'Триггер',
//         id: '1',
//         image: '/static/img/series4.jpg',
//         ageLimit: '18',
//         year: '2020',
//         country: 'Россия',
//         mainGenre: 'Драмы',
//     },
//     {
//         type: 'films',
//         russianName: 'Навстречу Тьме',
//         id: '1',
//         image: '/static/img/series2.jpg',
//         ageLimit: '18',
//         year: '2018',
//         country: 'США',
//         mainGenre: 'Боевики',
//     },
//     {
//         type: 'films',
//         russianName: 'Столкновение',
//         id: '1',
//         image: '/static/img/series3.jpg',
//         ageLimit: '16',
//         year: '2018 - 2019',
//         country: 'Турция',
//         mainGenre: 'Триллеры',
//     },
//     {
//         type: 'films',
//         russianName: 'Триггер',
//         id: '1',
//         image: '/static/img/series4.jpg',
//         ageLimit: '18',
//         year: '2020',
//         country: 'Россия',
//         mainGenre: 'Драмы',
//     },
//     {
//         type: 'films',
//         russianName: 'Навстречу Тьме',
//         id: '1',
//         image: '/static/img/series2.jpg',
//         ageLimit: '18',
//         year: '2018',
//         country: 'США',
//         mainGenre: 'Боевики',
//     },
//     {
//         type: 'films',
//         russianName: 'Столкновение',
//         id: '1',
//         image: '/static/img/series3.jpg',
//         ageLimit: '16',
//         year: '2018 - 2019',
//         country: 'Турция',
//         mainGenre: 'Триллеры',
//     },
//     {
//         type: 'films',
//         russianName: 'Триггер',
//         id: '1',
//         image: '/static/img/series4.jpg',
//         ageLimit: '18',
//         year: '2020',
//         country: 'Россия',
//         mainGenre: 'Драмы',
//     },
//     {
//         type: 'films',
//         russianName: 'Навстречу Тьме',
//         id: '1',
//         image: '/static/img/series2.jpg',
//         ageLimit: '18',
//         year: '2018',
//         country: 'США',
//         mainGenre: 'Боевики',
//     },
//     {
//         type: 'films',
//         russianName: 'Столкновение',
//         id: '1',
//         image: '/static/img/series3.jpg',
//         ageLimit: '16',
//         year: '2018 - 2019',
//         country: 'Турция',
//         mainGenre: 'Триллеры',
//     },
//     {
//         type: 'films',
//         russianName: 'Триггер',
//         id: '1',
//         image: '/static/img/series4.jpg',
//         ageLimit: '18',
//         year: '2020',
//         country: 'Россия',
//         mainGenre: 'Драмы',
//     },
//     {
//         type: 'films',
//         russianName: 'Навстречу Тьме',
//         id: '1',
//         image: '/static/img/series2.jpg',
//         ageLimit: '18',
//         year: '2018',
//         country: 'США',
//         mainGenre: 'Боевики',
//     },
//     {
//         type: 'films',
//         russianName: 'Столкновение',
//         id: '1',
//         image: '/static/img/series3.jpg',
//         ageLimit: '16',
//         year: '2018 - 2019',
//         country: 'Турция',
//         mainGenre: 'Триллеры',
//     },
//     {
//         type: 'films',
//         russianName: 'Триггер',
//         id: '1',
//         image: '/static/img/series4.jpg',
//         ageLimit: '18',
//         year: '2020',
//         country: 'Россия',
//         mainGenre: 'Драмы',
//     },
// ];

export default class ProfileView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this.eventBus.subscribe(PROFILE_EVENTS.showMsg, this.showMessage.bind(this));
        this.eventBus.subscribe(PROFILE_EVENTS.updateUserData, this.updateUserData.bind(this));
    }

    render(root) {
        Api.getUserData()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    return res.json();
                } else if (res.status === UNAUTHORIZED_STATUS) {
                    this.eventBus.publish(PROFILE_EVENTS.unauthUser);
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.data = res.body;
                this.data.avatar = this.data.image === '' ?
                    DEFAULT_AVATAR :
                    `http://64.225.100.179:8080/image/${this.data.image}`;
                super.render(root);
                this.afterRender();
            })
            .catch((err) => {
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
        console.log('on playlist');
    }

    onStats() {
        this.actionContainer.innerHTML = '';
        console.log('on stats');
    }

    onSubscriptions() {
        this.actionContainer.innerHTML = '';
        console.log('on subs');
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
                } else if (res.status === INTERNAL_ERROR_STATUS) {
                    return Promise.reject(res);
                } else {
                    this.showMessage(PROFILE_MSGS.error_avatar_upload, true);
                }
            })
            .then((res) => {
                this.avatar.style.backgroundImage =
                    `url(http://64.225.100.179:8080/image/${res.body})`;
                this.showMessage(PROFILE_MSGS.success_avatar_upload);
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    showMessage(msg, isError = false) {
        this.msgElement.classList.replace(
            `user-avatar__msg_${isError ? 'success' : 'error'}`,
            `user-avatar__msg_${isError ? 'error' : 'success'}`,
        );
        this.msgElement.textContent = msg;
        this.msgElement.style.opacity = '1';
    }

    updateUserData(username = '', email = '') {
        this.data.username = username;
        this.data.email = email;
        this.root.getElementsByClassName('user-avatar__name')[0].innerText = username;
    }
}
