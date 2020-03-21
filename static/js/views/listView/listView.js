import View from '../view';
import template from './listView.xml';
import Api from '../../libs/api';
import Network from '../../libs/network';
import {SUCCESS_STATUS} from '../../libs/constants';

const data = {
    filters: {
        genres: [
            {
                name: 'Все жанры',
                reference: 'all',
            },
        ],
        years: [
            'Все годы',
            '2020',
        ],
    },
    list: [
        {
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'year': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'year': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
        {
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
            'year': '2018 - 2019',
            'country': 'Турция',
            'genre': 'Триллеры',
        },
        {
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
            'year': '2020',
            'country': 'Россия',
            'genre': 'Драмы',
        },
        {
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'year': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'year': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
        {
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
            'year': '2018 - 2019',
            'country': 'Турция',
            'genre': 'Триллеры',
        },
        {
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
            'year': '2020',
            'country': 'Россия',
            'genre': 'Драмы',
        },
        {
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'year': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'year': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
    ],
};

export default class ListView extends View {
    constructor(eventBus, type) {
        super(template, eventBus);
        this.type = type;

        this.data = {};
        this.data.type = type;
        this.data.category = type === 'series' ? 'Сериалы' : 'Фильмы';
    }

    render(root) {
        Network.doGet({
            url: `/${this.type}`,
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        res = data;
                        this.data.filters = res.filters;
                        this.data.list = res.list;
                        super.render(root);
                    });
                } else {
                    console.log('something went wrong');
                }
            })
            .catch((err) => {
                this.data.filters = data.filters;
                this.data.list = data.list;
                super.render(root);
            });
    }
}
