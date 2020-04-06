import View from 'views/view';
import template from './profileView.tmpl.xml';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import Api from 'libs/api';
import {PROFILE_EVENTS, SUCCESS_STATUS} from 'libs/constants';

const cardList = [
    {
        type: 'films',
        russianName: 'Навстречу Тьме',
        id: '1',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        type: 'films',
        russianName: 'Столкновение',
        id: '1',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        type: 'films',
        russianName: 'Триггер',
        id: '1',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        type: 'films',
        russianName: 'Навстречу Тьме',
        id: '1',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        type: 'films',
        russianName: 'Столкновение',
        id: '1',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        type: 'films',
        russianName: 'Триггер',
        id: '1',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        type: 'films',
        russianName: 'Навстречу Тьме',
        id: '1',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        type: 'films',
        russianName: 'Столкновение',
        id: '1',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        type: 'films',
        russianName: 'Триггер',
        id: '1',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        type: 'films',
        russianName: 'Навстречу Тьме',
        id: '1',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        type: 'films',
        russianName: 'Столкновение',
        id: '1',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        type: 'films',
        russianName: 'Триггер',
        id: '1',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
    {
        type: 'films',
        russianName: 'Навстречу Тьме',
        id: '1',
        image: '/static/img/series2.jpg',
        ageLimit: '18',
        year: '2018',
        country: 'США',
        mainGenre: 'Боевики',
    },
    {
        type: 'films',
        russianName: 'Столкновение',
        id: '1',
        image: '/static/img/series3.jpg',
        ageLimit: '16',
        year: '2018 - 2019',
        country: 'Турция',
        mainGenre: 'Триллеры',
    },
    {
        type: 'films',
        russianName: 'Триггер',
        id: '1',
        image: '/static/img/series4.jpg',
        ageLimit: '18',
        year: '2020',
        country: 'Россия',
        mainGenre: 'Драмы',
    },
];

const collections = [
    {
        name: 'Избранное',
        list: cardList,
    },
    {
        name: 'Просмотрено',
        list: cardList,
    },
    {
        name: 'Отложено',
        list: cardList,
    },
];

export default class ProfileView extends View {
    constructor(eventBus) {
        super(template, eventBus);
    }

    render(root) {
        this.root = root;

        Api.getUserData()
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json()
                        .then((res) => {
                            this.data = res.body;
                            this.data.avatar = this.data.image;
                            this.successRender();
                        });
                } else {
                    this.eventBus.publish(PROFILE_EVENTS.unauthUser);
                }
            });
    }

    successRender() {
        if (this.data.avatar !== undefined) {
            this.data.avatar = '/static/img/avatar.jpg';
        }

        super.render(this.root);

        this.collections = this.root.getElementsByClassName('collections')[0];
        collections.forEach((colletion) => {
            const swiper = new SwiperComponent(colletion);
            swiper.render(this.collections);
        });
        const logout = this.root.querySelector('[href="/logout"]');
        this.onLogout = this.onLogout.bind(this);

        logout.addEventListener('click', this.onLogout);
    }

    onLogout(event) {
        Api.doLogout()
            .then((res) => {
                this.eventBus.publish(PROFILE_EVENTS.logout);
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
