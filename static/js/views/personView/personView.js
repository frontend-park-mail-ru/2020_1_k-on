import View from 'views/view';
import template from './personView.tmpl.xml';
import SwiperComponent from 'components/swiperComponent/swiperComponent';
import {SUCCESS_STATUS} from 'libs/constants';
import Api from 'libs/api';

const data = {
    'name': 'Максим Матвеев',
    'occupation': 'actor',
    'birthDate': '28 июля 1982 года',
    'birthPlace': 'Светлый, Калининградская область, СССР',
    'image': '/static/img/person.jpg',
    'films': [
        {
            'id': '1',
            'type': 'films',
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'year': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'year': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
            'year': '2018 - 2019',
            'country': 'Турция',
            'genre': 'Триллеры',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
            'year': '2020',
            'country': 'Россия',
            'genre': 'Драмы',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'year': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'year': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
            'year': '2018 - 2019',
            'country': 'Турция',
            'genre': 'Триллеры',
        },
        {
            'id': '1',
            'type': 'films',
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
            'year': '2020',
            'country': 'Россия',
            'genre': 'Драмы',
        },
    ],
    'series': [
        {
            'id': '1',
            'type': 'series',
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'yearFirst': '2018',
            'yearLast': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'yearFirst': '2018 - 2019',
            'yearLast': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
            'yearFirst': '2018 - 2019',
            'yearLast': '2018 - 2019',
            'country': 'Турция',
            'genre': 'Триллеры',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
            'yearFirst': '2020',
            'yearLast': '2020',
            'country': 'Россия',
            'genre': 'Драмы',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Лучшие в Лос-Анджелесе',
            'ageLimit': '16',
            'image': '/static/img/series1.jpeg',
            'yearFirst': '2018',
            'yearLast': '2018',
            'country': 'США',
            'genre': 'Боевики',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Навстречу тьме',
            'ageLimit': '18',
            'image': '/static/img/series2.jpg',
            'yearFirst': '2018 - 2019',
            'yearLast': '2018 - 2019',
            'country': 'США',
            'genre': 'Ужасы',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Столкновение',
            'ageLimit': '16',
            'image': '/static/img/series3.jpg',
            'yearFirst': '2018 - 2019',
            'yearLast': '2018 - 2019',
            'country': 'Турция',
            'genre': 'Триллеры',
        },
        {
            'id': '1',
            'type': 'series',
            'name': 'Триггер',
            'ageLimit': '18',
            'image': '/static/img/series4.jpg',
            'yearFirst': '2020',
            'yearLast': '2020',
            'country': 'Россия',
            'genre': 'Драмы',
        },
    ],
};

export default class PersonView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this.id = 0;
    }

    render(root) {
        Api.getPerson(this.id).then((res) => {
            if (res.status === SUCCESS_STATUS) {
                res.json().then((res) => {
                    this.data = res.body;
                    super.render(root);

                    const listsContainer = document.getElementById('person-lists-container');

                    if (this.data.films) {
                        const filmsSwiper = new SwiperComponent({
                            name: 'Фильмы с участием актера',
                            list: this.data.films,
                        });
                        filmsSwiper.render(listsContainer);
                    }

                    if (this.data.series) {
                        const seriesSwiper = new SwiperComponent({
                            name: 'Сериалы с участием актера',
                            list: this.data.series,
                        });
                        seriesSwiper.render(listsContainer);
                    }
                });
            } else {
                console.log('something went wrong');
            }
        });
    }

    setId(id) {
        this.id = id;
    }
}
