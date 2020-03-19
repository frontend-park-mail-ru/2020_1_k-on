import View from '../view';
import template from './indexView.tmpl.xml';

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
        },
        {
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
        },
        {
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
        },
        {
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
        },
        {
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
        },
        {
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
        },
        {
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
        },
        {
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
        },
        {
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
        },
        {
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
        },
    ],
};

export default class IndexView extends View {
    constructor() {
        super(template);
        this.data = data;
    }

    render(root) {
        super.render(root);
    }
}
