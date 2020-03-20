import View from '../view';
import template from './listView.xml';

const data = {
    path: [
        {
            name: 'Главная',
            href: '/',
        },
    ],
    category: 'Сериалы',
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
    constructor(eventBus) {
        super(template, eventBus);
        this.data = data;
    }

    render(root) {
        super.render(root);
    }
}
