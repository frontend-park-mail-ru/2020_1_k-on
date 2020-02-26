import View from '../view';

const data = [
    {
        'name': 'Лучшие в Лос-Анджелесе',
        'ageLimit': 16,
        'image': '/static/img/series1.jpeg'
    },
    {
        'name': 'Навстречу тьме',
        'ageLimit': 18,
        'image': '/static/img/series2.jpg'
    },
    {
        'name': 'Столкновение',
        'ageLimit': 16,
        'image': '/static/img/series3.jpg'
    },
    {
        'name': 'Триггер',
        'ageLimit': 18,
        'image': '/static/img/series4.jpg'
    },
    {
        'name': 'Лучшие в Лос-Анджелесе',
        'ageLimit': 16,
        'image': '/static/img/series1.jpeg'
    },
    {
        'name': 'Навстречу тьме',
        'ageLimit': 18,
        'image': '/static/img/series2.jpg'
    },
    {
        'name': 'Столкновение',
        'ageLimit': 16,
        'image': '/static/img/series3.jpg'
    },
    {
        'name': 'Триггер',
        'ageLimit': 18,
        'image': '/static/img/series4.jpg'
    },
];

export default class IndexView extends View {
    constructor() {
        super();
        this._data = data;
    }

    render(root) {
        this.element.className = 'index-page';
        this.tmpl = window.fest['js/views/indexView/indexView.tmpl'](this._data);
        super.render(root);
    }
}
