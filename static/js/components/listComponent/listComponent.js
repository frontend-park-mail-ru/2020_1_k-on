import Api from 'libs/api';
import template from './listComponent.tmpl.xml';
import {
    DEFAULT_FILTERS,
    SUCCESS_STATUS,
} from 'libs/constants';
import Component from 'components/component';

const data = [
    {
        'id': '1',
        'type': 'series',
        'name': 'Лучшие в Лос-Анджелесе',
        'ageLimit': '16',
        'image': '/static/img/series1.jpeg',
        'year': '2018',
        'country': 'США',
        'genre': 'Боевики',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Навстречу тьме',
        'ageLimit': '18',
        'image': '/static/img/series2.jpg',
        'year': '2018 - 2019',
        'country': 'США',
        'genre': 'Ужасы',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Столкновение',
        'ageLimit': '16',
        'image': '/static/img/series3.jpg',
        'year': '2018 - 2019',
        'country': 'Турция',
        'genre': 'Триллеры',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Триггер',
        'ageLimit': '18',
        'image': '/static/img/series4.jpg',
        'year': '2020',
        'country': 'Россия',
        'genre': 'Драмы',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Лучшие в Лос-Анджелесе',
        'ageLimit': '16',
        'image': '/static/img/series1.jpeg',
        'year': '2018',
        'country': 'США',
        'genre': 'Боевики',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Навстречу тьме',
        'ageLimit': '18',
        'image': '/static/img/series2.jpg',
        'year': '2018 - 2019',
        'country': 'США',
        'genre': 'Ужасы',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Столкновение',
        'ageLimit': '16',
        'image': '/static/img/series3.jpg',
        'year': '2018 - 2019',
        'country': 'Турция',
        'genre': 'Триллеры',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Триггер',
        'ageLimit': '18',
        'image': '/static/img/series4.jpg',
        'year': '2020',
        'country': 'Россия',
        'genre': 'Драмы',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Лучшие в Лос-Анджелесе',
        'ageLimit': '16',
        'image': '/static/img/series1.jpeg',
        'year': '2018',
        'country': 'США',
        'genre': 'Боевики',
    },
    {
        'id': '1',
        'type': 'series',
        'name': 'Навстречу тьме',
        'ageLimit': '18',
        'image': '/static/img/series2.jpg',
        'year': '2018 - 2019',
        'country': 'США',
        'genre': 'Ужасы',
    },
];

export default class ListComponent extends Component {
    constructor(type) {
        super(template);
        this.type = type;
        this.chosenFilters = DEFAULT_FILTERS;
    }

    render(root) {
        Api.getList(this.type, {
            maingenre: this.chosenFilters.genre.reference,
            year: this.chosenFilters.year.reference,
            order: this.chosenFilters.ordering.reference,
            page: '1',
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        this.data.list = res.body;
                        this.data.type = this.type;
                        super.render(root);
                    });
                } else {
                    console.log('something went wrong');
                }
            });
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

    setFilter(filterName, name, reference) {
        this.chosenFilters[filterName] = {
            name: name,
            reference: reference,
        };
    }
}
