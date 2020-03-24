import Api from 'libs/api';
import template from './listComponent.tmpl.xml';
import {
    DEFAULT_FILTERS,
    SUCCESS_STATUS,
} from 'libs/constants';

const data = [
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
];

export default class ListComponent {
    constructor(type) {
        this.tmpl = template;
        this.type = type;
        this.chosenFilters = DEFAULT_FILTERS;
    }

    render(root) {
        Api.getList(this.type, {
            genre: this.chosenFilters.genre.reference,
            year: this.chosenFilters.year.reference,
            ordering: this.chosenFilters.ordering.reference,
            page: '1',
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                    });
                } else {
                    console.log('something went wrong');
                }
            });

        this.data = data;
        this.root = root;
        this.root.innerHTML = this.tmpl(this.data);
    }

    changeFilter(filterName, name, reference) {
        this.chosenFilters[filterName] = {
            name: name,
            reference: reference,
        };
        this.render(this.root);
    }

    setDefaultFilters() {
        this.chosenFilters = DEFAULT_FILTERS;
    }
}
