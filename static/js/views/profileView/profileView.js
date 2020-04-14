import View from 'views/view';
import template from './profileView.tmpl.xml';
import Api from 'libs/api';
import CardComponent from 'components/cardComponent/cardComponent';
import CollectionComponent from 'components/collectionComponent/collectionComponent';
import {
    DEFAULT_AVATAR,
    PROFILE_EVENTS,
    SUCCESS_STATUS,
    UNAUTHORIZED_STATUS,
} from 'libs/constants';

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
                    return res.json();
                } else if (res.status === UNAUTHORIZED_STATUS) {
                    this.eventBus.publish(PROFILE_EVENTS.unauthUser);
                } else {
                    return Promise.reject(res);
                }
            })
            .then((res) => {
                this.data = res.body;
                this.successRender();
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }

    successRender() {
        this.data.avatar = this.data.image === '' ?
            DEFAULT_AVATAR :
            `http://64.225.100.179:8080/image/${this.data.image}`;

        super.render(this.root);


        const collectionsElem = this.root.getElementsByClassName('collections')[0];

        collections.forEach((collection) => {
            const cards = collection.list.map((item) => {
                const cardComponent = new CardComponent(item);
                const card = cardComponent.render();
                card.style.marginBottom = 0;
                return card;
            });

            const collectionComponent = new CollectionComponent({
                name: collection.name,
                elements: cards,
            });

            collectionsElem.appendChild(collectionComponent.render());
        });

        const logout = this.root.querySelector('[href="/logout"]');
        this.onLogout = this.onLogout.bind(this);

        logout.addEventListener('click', this.onLogout);
    }

    onLogout() {
        Api.doLogout()
            .then((res) => {
                this.eventBus.publish(PROFILE_EVENTS.logout);
            })
            .catch((err) => {
                this.eventBus.publish(PROFILE_EVENTS.internalError, err.status);
            });
    }
}
