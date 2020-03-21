import View from '../view';
import template from './listView.xml';
import Api from '../../libs/api';
import {SUCCESS_STATUS} from '../../libs/constants';

const data = {
    filters: {
        genre: [
            {
                name: 'Все жанры',
                value: 'all',
            },
            {
                name: 'Анимация',
                value: 'all',
            },
            {
                name: 'Биографические',
                value: 'all',
            },
            {
                name: 'Боевики',
                value: 'all',
            },
            {
                name: 'Военные',
                value: 'all',
            },
            {
                name: 'Детективы',
                value: 'all',
            },
            {
                name: 'Документальные',
                value: 'all',
            },
            {
                name: 'Драмы',
                value: 'all',
            },
            {
                name: 'Исторические',
                value: 'all',
            },
            {
                name: 'Комедии',
                value: 'all',
            },
            {
                name: 'Криминал',
                value: 'all',
            },
            {
                name: 'Мелодрамы',
                value: 'all',
            },
        ],
        year: [
            {
                name: 'Все годы',
                value: 'all',
            },
            {
                name: '2020',
                value: '2020',
            },
            {
                name: '2019',
                value: '2019',
            },
            {
                name: '2018',
                value: '2018',
            },
            {
                name: '2017',
                value: '2017',
            },
            {
                name: '2016',
                value: '2016',
            },
            {
                name: '2015',
                value: '2015',
            },
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
        this.data.filtersList = [
            'genre',
            'year',
            'ordering',
        ];
        this.data.chosenFilters = {
            genre: {
                name: 'Все жанры',
                value: 'all',
            },
            year: {
                name: 'Все годы',
                value: 'all',
            },
            ordering: {
                name: 'По рейтингу',
                value: 'rating',
            },
        };
    }

    render(root) {
        Api.getList(this.type, {
            genre: this.data.chosenFilters.genre.value,
            year: this.data.chosenFilters.year.value,
            ordering: this.data.chosenFilters.ordering.value,
            limit: '20',
            offset: '0',
        })
            .then((res) => {
                if (res.status === SUCCESS_STATUS) {
                    res.json().then((res) => {
                        res = data;
                    });
                } else {
                    console.log('something went wrong');
                }
            });

        this.data.filters = data.filters;
        this.data.list = data.list;
        this.data.filters.ordering = [
            {
                name: 'По рейтингу',
                value: 'rating',
            },
            {
                name: 'По новизне',
                value: 'novelty',
            },
            {
                name: 'По рейтингу IMDb',
                value: 'ratingImdb',
            },
        ];
        super.render(root);

        for (const filterButton of document.getElementsByClassName('filter-button')) {
            filterButton.addEventListener(
                'click',
                this.onFilterButtonClick.bind(this)
            );
        }

        for (const filterSubmenu of document.getElementsByClassName('filter-submenu')) {
            filterSubmenu.addEventListener(
                'click',
                this.onFilterValueClick.bind(this)
            );
        }
    }

    onFilterButtonClick(evt) {
        const filterButton = evt.currentTarget;
        const submenu = filterButton.nextElementSibling;
        if (getComputedStyle(submenu).visibility === 'hidden') {
            for (const filterButton of document.getElementsByClassName('filter-button')) {
                this.closeFilter(filterButton);
            }
            this.openFilter(filterButton);
        } else {
            this.closeFilter(filterButton);
        }
    }

    onFilterValueClick(evt) {
        if (!(evt.target instanceof HTMLSpanElement)) {
            return;
        }

        const filterLink = evt.target;
        const filterName = evt.currentTarget.dataset.name;
        if (filterLink.innerText === this.data.chosenFilters[filterName]) {
            return;
        }

        this.data.chosenFilters[filterName] = {
            name: filterLink.innerText,
            value: filterLink.dataset.value,
        };
        const filterButton = evt.currentTarget.previousElementSibling;
        this.closeFilter(filterButton);

        this.render(this.root);
    }

    openFilter(filterButton) {
        const arrow = filterButton.lastElementChild;
        const submenu = filterButton.nextElementSibling;

        filterButton.classList.add('filter-button_active');
        arrow.classList.add('filter-button__arrow_active');
        submenu.style.visibility = 'visible';
        submenu.style.opacity = '1';
        arrow.style.transform = 'rotateZ(180deg)';
    }

    closeFilter(filterButton) {
        const arrow = filterButton.lastElementChild;
        const submenu = filterButton.nextElementSibling;

        filterButton.classList.remove('filter-button_active');
        arrow.classList.remove('filter-button__arrow_active');
        submenu.style.visibility = 'hidden';
        submenu.style.opacity = '0';
        arrow.style.transform = 'rotateZ(0)';
    }
}
